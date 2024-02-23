export const FooterCell = ({ table }: any) => {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;

  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row: any) => row.index)
    );
    table.resetRowSelection();
  };

  return (
    <div className="bg-transparent border-none flex jutify-end items-center gap-7 p-5">
      {selectedRows.length > 0 ? (
        <button className="bg-[#e44747] rounded-md p-2" onClick={removeRows}>
          Remove Selected x
        </button>
      ) : null}
      <button className="bg-[#4bbd7f] rounded-md p-2" onClick={meta?.addRow}>
        Add New +
      </button>
    </div>
  );
};
