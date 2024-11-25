import {Skeleton, Table} from "antd";
import {ColumnsType} from "antd/lib/table";
import Column from "antd/lib/table/Column";
import React from "react";
import './index.scss';

interface Props {}

const TableComponentSkeleton = (props: Props) => {
    const columns: ColumnsType<any> = [
        {
            className: "small",
            dataIndex: "statusColor",
            title: <Skeleton.Input active size={"small"} />,
            key: "TableComponentSkeleton_1",
            filtered: true,
            render: (_text, record: any) => {
                return (
                    <div className="TableComponentSkeleton__cell">
                        <Skeleton.Input active size={"small"} />
                    </div>
                );
            },
        },
        {
            className: "small",
            dataIndex: "statusColor",
            title: <Skeleton.Button active size={"small"} />,
            key: "TableComponentSkeleton_1",
            filtered: true,
            render: (_text, record: any) => {
                return (
                    <div className="TableComponentSkeleton__cell">
                        <Skeleton.Button active size={"small"} />
                    </div>
                );
            },
        },
        {
            className: "small",
            dataIndex: "statusColor",
            title: <Skeleton.Input active size={"small"} />,
            key: "TableComponentSkeleton_1",
            filtered: true,
            render: (_text, record: any) => {
                return (
                    <div className="TableComponentSkeleton__cell">
                        <Skeleton.Input active size={"small"} />
                    </div>
                );
            },
        },
        {
            className: "small",
            dataIndex: "statusColor",
            title: <Skeleton.Button active size={"small"} />,
            key: "TableComponentSkeleton_1",
            filtered: true,
            render: (_text, record: any) => {
                return (
                    <div className="TableComponentSkeleton__cell">
                        <Skeleton.Button active size={"small"} />
                    </div>
                );
            },
        },
        {
            className: "small",
            dataIndex: "statusColor",
            title: <Skeleton.Input active size={"small"} />,
            key: "TableComponentSkeleton_1",
            filtered: true,
            render: (_text, record: any) => {
                return (
                    <div className="TableComponentSkeleton__cell">
                        <Skeleton.Input active size={"small"} />
                    </div>
                );
            },
        },
        {
            className: "small",
            dataIndex: "statusColor",
            title: <Skeleton.Button active size={"small"} />,
            key: "TableComponentSkeleton_1",
            filtered: true,
            render: (_text, record: any) => {
                return (
                    <div className="TableComponentSkeleton__cell">
                        <Skeleton.Button active size={"small"} />
                    </div>
                );
            },
        },
        {
            className: "small",
            dataIndex: "statusColor",
            title: <Skeleton.Input active size={"small"} />,
            key: "TableComponentSkeleton_1",
            filtered: true,
            render: (_text, record: any) => {
                return (
                    <div className="TableComponentSkeleton__cell">
                        <Skeleton.Input active size={"small"} />
                    </div>
                );
            },
        },
    ];
    return (
        <Table
            className="TableComponent TableComponentSkeleton"
            data-testid="TableComponent"
            dataSource={[{}, {}, {}, {}, {}, {}, {}, {}]}
            showSorterTooltip={false}
            pagination={false}
            columns={columns}>
            {columns?.map(column => {
                return (
                    <Column
                        title={column.title}
                        className="TableComponentSkeleton__item"
                        key={column.key}
                        render={column.render}
                    />
                );
            })}
        </Table>
    );
};

export default TableComponentSkeleton;