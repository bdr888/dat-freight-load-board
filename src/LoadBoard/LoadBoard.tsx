import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from 'lucide-react'
import Page from '../components/Page'
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_equalsString,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import mockLoadData from '../data/mockLoads.json'

type Load = (typeof mockLoadData.loads)[number]

const loadData = mockLoadData.loads
const statuses = ['Available', 'In Transit', 'Delivered'] as const
const initialState = { pagination: { pageIndex: 0, pageSize: 10 } }

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    equalsString: filterFn_equalsString,
    includesString: filterFn_includesString,
  },
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
  },
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
})

const columnHelper = createColumnHelper<typeof features, Load>()

const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Load ID',
    cell: (context) => (
      <span className="font-medium text-slate-500">{context.getValue()}</span>
    ),
  }),
  columnHelper.accessor('companyName', {
    header: 'Company',
    cell: (context) => (
      <span className="font-semibold text-slate-900">{context.getValue()}</span>
    ),
  }),
  columnHelper.accessor('origin', {
    header: 'Origin',
    cell: (context) => context.getValue(),
  }),
  columnHelper.accessor('destination', {
    header: 'Destination',
    cell: (context) => context.getValue(),
  }),
  columnHelper.accessor('weight', {
    header: 'Weight',
    cell: (context) => `${context.getValue().toLocaleString('en-US')} lb`,
  }),
  columnHelper.accessor('equipmentType', {
    header: 'Equipment',
    cell: (context) => context.getValue(),
  }),
  columnHelper.accessor('date', {
    header: 'Pickup date',
    cell: (context) =>
      new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(`${context.getValue()}T00:00:00`)),
  }),
  columnHelper.accessor('price', {
    header: 'Rate',
    cell: (context) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(context.getValue()),
  }),
  columnHelper.accessor('distance', {
    header: 'Distance',
    cell: (context) => `${context.getValue().toLocaleString('en-US')} mi`,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    filterFn: 'equalsString',
    cell: (context) => <StatusBadge status={context.getValue()} />,
  }),
])

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === 'Available'
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
      : status === 'In Transit'
        ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
        : 'bg-slate-100 text-slate-600 ring-slate-500/20'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  )
}

export default function LoadBoard() {
  const table = useTable(
    {
      features,
      columns,
      data: loadData,
      initialState,
      getRowId: (load) => load.id,
      globalFilterFn: 'includesString',
    },
    (state) => ({
      globalFilter: state.globalFilter,
      columnFilters: state.columnFilters,
      sorting: state.sorting,
      pagination: state.pagination,
    })
  )

  const rows = table.getRowModel().rows
  const totalRows = table.getRowCount()
  const pageCount = table.getPageCount()
  const pageIndex = table.state.pagination.pageIndex
  const pageSize = table.state.pagination.pageSize
  const searchValue = String(table.state.globalFilter ?? '')
  const statusColumn = table.getColumn('status')
  const statusValue = String(statusColumn?.getFilterValue() ?? '')
  const hasActiveFilters = searchValue !== '' || statusValue !== ''
  const firstVisibleRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const lastVisibleRow = Math.min((pageIndex + 1) * pageSize, totalRows)

  function clearFilters() {
    table.setGlobalFilter('')
    table.setColumnFilters([])
  }

  return (
    <Page
      eyebrow="DAT FREIGHT MARKETPLACE"
      title="Load board"
      description="Browse and compare freight opportunities across the network."
      headerContent={
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm">
          <span
            className="size-2 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          {loadData.length} loads posted
        </div>
      }
    >
      {/* Search and filter controls */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="relative block min-w-0 flex-1 sm:max-w-md">
            <Label htmlFor="load-search" className="sr-only">
              Search loads
            </Label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="load-search"
              type="search"
              value={searchValue}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              placeholder="Search loads, lanes, or companies"
              className="h-10 w-full rounded-lg border border-slate-500 bg-white pr-3 pl-10 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Label htmlFor="status-filter" className="whitespace-nowrap">
              Status
            </Label>
            <Select
              value={statusValue || null}
              onValueChange={(value) =>
                statusColumn?.setFilterValue(value ?? undefined)
              }
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              onClick={clearFilters}
              variant="ghost"
              size="lg"
            >
              <X className="size-4" aria-hidden="true" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Table */}
        <Table>
          <caption className="sr-only">
            Freight loads with their pickup details, rate, distance, and
            availability.
          </caption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortDirection = header.column.getIsSorted()

                  return (
                    <TableHead
                      key={header.id}
                      scope="col"
                      aria-sort={
                        sortDirection === 'asc'
                          ? 'ascending'
                          : sortDirection === 'desc'
                            ? 'descending'
                            : 'none'
                      }
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <Button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          variant="ghost"
                          size="xs"
                        >
                          <table.FlexRender header={header} />
                          {sortDirection === 'asc' ? (
                            <ArrowUp className="size-3.5" aria-hidden="true" />
                          ) : sortDirection === 'desc' ? (
                            <ArrowDown
                              className="size-3.5"
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowUpDown
                              className="size-3.5 opacity-50"
                              aria-hidden="true"
                            />
                          )}
                        </Button>
                      ) : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell variant="empty" colSpan={columns.length}>
                  <p className="font-semibold text-slate-900">
                    No loads match your filters
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try a different search or clear the selected status.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <footer className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3.5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p role="status" aria-atomic="true">
            Showing{' '}
            <span className="font-semibold text-slate-900">
              {firstVisibleRow}–{lastVisibleRow}
            </span>{' '}
            of <span className="font-semibold text-slate-900">{totalRows}</span>{' '}
            loads
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="page-size">Rows per page</Label>
              <Select
                value={String(pageSize)}
                onValueChange={(value) => {
                  if (value !== null) table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger id="page-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 50].map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span className="whitespace-nowrap">
              Page {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
            </span>
            <nav aria-label="Pagination" className="flex items-center gap-1">
              <Button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous page"
                variant="outline"
                size="icon"
                className="border-slate-500"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next page"
                variant="outline"
                size="icon"
                className="border-slate-500"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </nav>
          </div>
        </footer>
      </div>
    </Page>
  )
}
