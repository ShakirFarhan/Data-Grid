import React, { useState } from 'react';
import { Table, Input, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

interface Column {
    key: string;
    title: string;
    editing: boolean;
}

interface Row {
    key: string;
    [key: string]: any;
}

interface Props {
    columns: Column[];
    dataSource: Row[];
}

const DataTable: React.FC<Props> = ({ columns: initialColumns, dataSource: initialDataSource }) => {
    const [columns, setColumns] = useState(initialColumns);
    const [dataSource, setDataSource] = useState(initialDataSource);
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleAddColumn = () => {
        const newColumn: Column = { key: Date.now().toString(), title: '', editing: true };
        setColumns([...columns, newColumn]);
    };

    const handleEditColumn = (index: number) => {
        const newColumns = [...columns];
        newColumns[index].editing = true;
        setColumns(newColumns);
    };


    const handleDeleteColumn = (index: number) => {
        const newColumns = columns.filter((_, i) => i !== index);
        setColumns(newColumns);
        const newData = dataSource.map((row) => {
            const newRow = { ...row };
            delete newRow[columns[index].key];
            return newRow;
        });
        setDataSource(newData);
    };

    const handleAddRow = () => {
        const newRow: Row = { key: Date.now().toString() };
        columns.forEach((column) => {
            newRow[column.key] = '';
        });
        setDataSource([...dataSource, newRow]);
        setEditingIndex(dataSource.length);
    };

    const handleEditRow = (index: number) => {
        setEditingIndex(index);
    };

    const handleSaveRow = (index: number) => {
        setEditingIndex(-1);
    };

    const handleDeleteRow = (index: number) => {
        const newData = dataSource.filter((_, i) => i !== index);
        setDataSource(newData);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, columnIndex: string) => {
        const { value } = event.target;
        const newData = [...dataSource];
        newData[rowIndex][columnIndex] = value;
        setDataSource(newData);
    };

    return (
        <div>
            <Table
                dataSource={columns}
                columns={[
                    {
                        title: 'Column Title',
                        dataIndex: 'title',
                        render: (text: string, column: Column, index: number) =>
                            column.editing ? (
                                <Input
                                    value={column.title}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        const newColumns = [...columns];
                                        const columnToEdit = newColumns[index];
                                        newColumns[index] = { ...columnToEdit, title: value };
                                        setColumns(newColumns);
                                    }}
                                />
                            ) : (
                                <Space>
                                    {column.title}
                                    <EditOutlined onClick={() => handleEditColumn(index)} />
                                    <DeleteOutlined onClick={() => handleDeleteColumn(index)} />
                                </Space>
                            ),
                    },
                ]}
                pagination={false}
            />
            {editingIndex !== -1 && (
                <Table
                    dataSource={[dataSource[editingIndex]]}
                    columns={columns.map((column) => ({
                        title: column.title,
                        dataIndex: column.key,
                        render: (text: string, row: Row) =>
                            editingIndex === -1 ? (
                                text
                            ) : (
                                <Input
                                    value={row[column.key]}
                                    onChange={(event) => handleInputChange(event, editingIndex, column.key)}
                                />
                            ),
                    }))}
                    pagination={false}
                />
            )}
            <Table
                dataSource={dataSource}
                columns={[
                    ...columns.map((column) => ({
                        title: column.title,
                        dataIndex: column.key,
                        render: (text: string, row: Row, rowIndex: number) =>
                            editingIndex === rowIndex ? (
                                <Input value={text} onChange={(event) => handleInputChange(event, rowIndex, column.key)} />
                            ) : (
                                text
                            ),
                    })),
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_: any, row: Row, rowIndex: number) =>
                            editingIndex === rowIndex ? (
                                <Space>
                                    <Button type="primary" icon={<SaveOutlined />} onClick={() => handleSaveRow(rowIndex)}>
                                        Save
                                    </Button>
                                    <Button onClick={() => handleDeleteRow(rowIndex)}>Delete</Button>
                                </Space>
                            ) : (
                                <Button onClick={() => handleEditRow(rowIndex)}>Edit</Button>
                            ),
                    },
                ]}
                pagination={false}
            />
            <Button onClick={handleAddColumn}>Add Column</Button>
            <Button onClick={handleAddRow}>Add Row</Button>
        </div>
    );
};

export default DataTable;

