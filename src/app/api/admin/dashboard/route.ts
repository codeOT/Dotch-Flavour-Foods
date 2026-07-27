import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin";
import { Order } from "@/models/Order";
import { User } from "@/models/User";

type MonthlyPoint = {
  month: string;
  revenue: number;
  orders: number;
};

function getLastMonths(count: number): string[] {
  const now = new Date();
  const months: string[] = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  }
  return months;
}

export async function GET(request: Request) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

    await connectDB();

    const [totalOrders, pendingOrders, paidOrders, usersCount] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "paid" }),
      User.countDocuments(),
    ]);

    const paidRevenueAgg = await Order.aggregate<{ total: number }>([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const paidRevenue = paidRevenueAgg[0]?.total ?? 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();

    const inventoryRows = await Order.aggregate<{
      itemId: string;
      name: string;
      quantitySold: number;
      revenue: number;
    }>([
      { $match: { status: { $in: ["paid", "pending"] } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: { id: "$items.id", name: "$items.name" },
          quantitySold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
        },
      },
      { $sort: { quantitySold: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          itemId: "$_id.id",
          name: "$_id.name",
          quantitySold: 1,
          revenue: 1,
        },
      },
    ]);

    const monthlyAgg = await Order.aggregate<MonthlyPoint>([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          revenue: { $sum: "$total" },
          orders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          revenue: 1,
          orders: 1,
        },
      },
      { $sort: { month: 1 } },
    ]);

    const last6Months = getLastMonths(6);
    const monthlyMap = new Map(monthlyAgg.map((item) => [item.month, item]));
    const monthlyRevenue = last6Months.map((month) => {
      const row = monthlyMap.get(month);
      return {
        month,
        revenue: row?.revenue ?? 0,
        orders: row?.orders ?? 0,
      };
    });

    return NextResponse.json({
      admin: {
        email: admin.email,
      },
      metrics: {
        totalOrders,
        pendingOrders,
        paidOrders,
        usersCount,
        paidRevenue,
      },
      inventoryReport: inventoryRows,
      monthlyRevenue,
      recentOrders: recentOrders.map((order) => ({
        id: String(order._id),
        orderNumber: order.orderNumber,
        fullName: order.fullName,
        email: order.email,
        status: order.status,
        deliveryMethod: order.deliveryMethod,
        total: order.total,
        createdAt: order.createdAt,
      })),
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json({ error: "Unable to load admin dashboard." }, { status: 500 });
  }
}
