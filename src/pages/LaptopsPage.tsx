
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLaptops, deleteLaptop } from "@/lib/api";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Laptop, MoreHorizontal, Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Laptop as LaptopType } from "@/lib/types";
import { useNavigate } from "react-router-dom";

const LaptopsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const { data: laptops, isLoading } = useQuery({
    queryKey: ["laptops"],
    queryFn: getLaptops,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLaptop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["laptops"] });
      toast({
        title: "Laptop deleted",
        description: "The laptop has been removed from inventory",
      });
    },
  });

  const filteredLaptops = laptops?.filter((laptop) => {
    const matchesSearch =
      laptop.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laptop.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || laptop.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id: string) => {
    navigate(`/laptops/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "assigned":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Laptops</h1>
        <Button onClick={() => navigate("/laptops/new")}>
          <Plus className="h-4 w-4 mr-2" /> Add Laptop
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search laptops..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLaptops && filteredLaptops.length > 0 ? (
                  filteredLaptops.map((laptop) => (
                    <TableRow key={laptop.id}>
                      <TableCell className="font-medium">
                        {laptop.serialNumber}
                      </TableCell>
                      <TableCell>{laptop.model}</TableCell>
                      <TableCell>{laptop.brand}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            laptop.status
                          )}`}
                        >
                          {laptop.status.charAt(0).toUpperCase() +
                            laptop.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{laptop.purchaseDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(laptop.id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDelete(laptop.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Laptop className="h-8 w-8 mb-2" />
                        <p>No laptops found</p>
                        {searchQuery && (
                          <p className="text-sm">
                            Try adjusting your search or filters
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Showing {filteredLaptops?.length || 0} of {laptops?.length || 0} laptops
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default LaptopsPage;
