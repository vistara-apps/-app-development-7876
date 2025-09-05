import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react'
import Input from './Input'
import Button from './Button'

const DataTable = ({ 
  data = [], 
  columns = [], 
  variant = 'sortable',
  searchable = false,
  filterable = false,
  className = '',
  onRowClick,
  pageSize = 10
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  // Filtering logic
  const filteredData = useMemo(() => {
    let filtered = sortedData

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(row =>
        columns.some(column => {
          const value = row[column.key]
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        })
      )
    }

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(row => 
          row[key] && row[key].toString().toLowerCase().includes(value.toLowerCase())
        )
      }
    })

    return filtered
  }, [sortedData, searchTerm, filters, columns])

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredData.slice(startIndex, startIndex + pageSize)
  }, [filteredData, currentPage, pageSize])

  const totalPages = Math.ceil(filteredData.length / pageSize)

  const handleSort = (key) => {
    if (variant !== 'sortable' && variant !== 'filterable') return

    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return null
    return sortConfig.direction === 'asc' ? 
      <ChevronUp size={16} className="inline ml-1" /> : 
      <ChevronDown size={16} className="inline ml-1" />
  }

  const handleFilterChange = (columnKey, value) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: value
    }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filter Controls */}
      {(searchable || filterable) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="flex-1">
              <Input
                icon={Search}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                variant="withIcon"
              />
            </div>
          )}
          {filterable && (
            <div className="flex gap-2">
              {columns.filter(col => col.filterable).map(column => (
                <Input
                  key={column.key}
                  placeholder={`Filter ${column.header}...`}
                  value={filters[column.key] || ''}
                  onChange={(e) => handleFilterChange(column.key, e.target.value)}
                  className="w-40"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left p-3 text-sm font-medium text-foreground ${
                    (variant === 'sortable' || variant === 'filterable') && column.sortable !== false
                      ? 'cursor-pointer hover:bg-accent/5 select-none'
                      : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {(variant === 'sortable' || variant === 'filterable') && 
                     column.sortable !== false && 
                     getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-border/50 hover:bg-accent/5 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick && onRowClick(row, index)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="p-3 text-sm text-foreground">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                Math.abs(page - currentPage) <= 1
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 py-1 text-muted">...</span>
                  )}
                  <Button
                    variant={currentPage === page ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                </React.Fragment>
              ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable
