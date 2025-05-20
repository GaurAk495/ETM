import {
  FolderIcon,
  DocumentIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

export default function Documents() {
  const documents = [
    {
      id: 1,
      name: "Employee Handbook",
      type: "PDF",
      size: "2.5 MB",
      lastModified: "2025-05-15",
      category: "HR",
    },
    {
      id: 2,
      name: "Project Guidelines",
      type: "DOC",
      size: "1.8 MB",
      lastModified: "2025-05-18",
      category: "Projects",
    },
    {
      id: 3,
      name: "Code Style Guide",
      type: "PDF",
      size: "1.2 MB",
      lastModified: "2025-05-19",
      category: "Development",
    },
    // Add more documents...
  ];

  const categories = [
    { name: "All Documents", count: 12 },
    { name: "HR", count: 3 },
    { name: "Projects", count: 5 },
    { name: "Development", count: 4 },
  ];

  return (
    <div className="space-y-6 p-10">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <select className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <option>All Types</option>
            <option>PDF</option>
            <option>DOC</option>
            <option>XLS</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="col-span-1 bg-white rounded-xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.name}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <FolderIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="col-span-3 bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <DocumentIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {doc.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {doc.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {doc.lastModified}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700">
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
