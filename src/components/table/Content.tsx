import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Transaction {
  id: number;
  amount: number;
  category: string;
  paymentMode: string;
  description: string | null;
  date: string;
  time: string;
}

const tableData: Transaction[] = [
  {
    id: 1,
    amount: 500,
    category: "shopping",
    paymentMode: "cash",
    description: '',
    date: "11/09/2001",
    time: "3:18"
  },
];

export default function Content() {
  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        {/* Table Header */}
        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
          <TableRow>
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Amount
            </TableCell>
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Category
            </TableCell>
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Description
            </TableCell>
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Date
            </TableCell>
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Time
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* Table Body */}

        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {tableData.map((product) => (
            <TableRow key={product.id} className="">
              
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {product.amount}
              </TableCell>
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {product.category}
              </TableCell>
              
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                <Badge
                  size="sm"
                  color={
                    product.paymentMode === "Delivered"
                      ? "success"
                      : product.paymentMode === "Pending"
                        ? "warning"
                        : "error"
                  }
                >
                  {product.paymentMode}
                </Badge>
              </TableCell>
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {product.date}
              </TableCell>
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {product.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
