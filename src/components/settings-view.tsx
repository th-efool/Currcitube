import { useState } from 'react';
import { useCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsView() {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const updateCategory = useUpdateCategory();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [usefulLife, setUsefulLife] = useState('3');
  const [residualPercent, setResidualPercent] = useState('0');

  // Edit state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editUsefulLife, setEditUsefulLife] = useState('');
  const [editResidualPercent, setEditResidualPercent] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory.mutateAsync({
        name,
        default_useful_life_years: parseInt(usefulLife) || 3,
        residual_value_percent: parseFloat(residualPercent) || 0,
      });
      toast.success('Category added');
      setDialogOpen(false);
      setName('');
      setUsefulLife('3');
      setResidualPercent('0');
    } catch {
      toast.error('Failed to add category');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory.mutateAsync(id);
      toast.success('Category removed');
    } catch {
      toast.error('Failed to remove category');
    }
  };

  const openEdit = (cat: { id: string; name: string; default_useful_life_years: number; residual_value_percent?: number }) => {
    setEditId(cat.id);
    setEditName(cat.name);
    setEditUsefulLife(String(cat.default_useful_life_years));
    setEditResidualPercent(String(cat.residual_value_percent ?? 0));
    setEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCategory.mutateAsync({
        id: editId,
        name: editName,
        default_useful_life_years: parseInt(editUsefulLife) || 3,
        residual_value_percent: parseFloat(editResidualPercent) || 0,
      });
      toast.success('Category updated');
      setEditDialogOpen(false);
    } catch {
      toast.error('Failed to update category');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base">Asset categories</CardTitle>
            <CardDescription className="text-xs">Manage categories with depreciation defaults</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="w-full sm:w-auto min-h-[44px] sm:min-h-0"><Plus className="mr-1 h-4 w-4" />Add category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add category</DialogTitle></DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Audio equipment" />
                </div>
                <div className="space-y-2">
                  <Label>Default useful life (years)</Label>
                  <Input type="number" min="1" value={usefulLife} onChange={e => setUsefulLife(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Residual value (%)</Label>
                  <Input type="number" min="0" max="100" step="1" value={residualPercent} onChange={e => setResidualPercent(e.target.value)} placeholder="0" />
                </div>
                <Button type="submit" className="w-full" disabled={createCategory.isPending}>
                  {createCategory.isPending ? 'Adding...' : 'Add category'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">{[1, 2].map(i => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : (
            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Useful life</TableHead>
                    <TableHead className="hidden sm:table-cell">Residual value</TableHead>
                    <TableHead className="w-20" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(categories ?? []).map(cat => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{cat.name}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{cat.default_useful_life_years} years</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{Number((cat as any).residual_value_percent ?? 0)}%</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground" onClick={() => openEdit(cat as any)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(cat.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Depreciation settings info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Depreciation method</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All assets use <span className="font-medium text-foreground">straight-line depreciation</span>. The useful life and residual value are configured per category above.
            Additional methods (declining balance, etc.) will be available in a future update.
          </p>
        </CardContent>
      </Card>

      {/* Edit dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit category</DialogTitle></DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={editName} onChange={e => setEditName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Default useful life (years)</Label>
              <Input type="number" min="1" value={editUsefulLife} onChange={e => setEditUsefulLife(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Residual value (%)</Label>
              <Input type="number" min="0" max="100" step="1" value={editResidualPercent} onChange={e => setEditResidualPercent(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={updateCategory.isPending}>
              {updateCategory.isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
