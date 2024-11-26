import React, {useState} from "react";
import AddListModal from "../AddListModal";
import {t} from "i18next";
import doSearch from "../../../utils/search";
import {ColumnsType} from "antd/lib/table";
import {IUser} from "../../../model/IUser";
import {accountApi} from "../../../api/account";
import {useParams} from "react-router-dom";
import {
    MAX_CELL_LENGTH_EMAIL,
    MAX_CELL_LENGTH_FIRST_NAME,
    MAX_CELL_LENGTH_KEY,
    MAX_CELL_LENGTH_LAST_NAME,
    MAX_CELL_LENGTH_ORGANIZATION_USER,
    MAX_CELL_LENGTH_ROLE,
    PAGE_SIZE,
} from "../../../constants";
import {projectAPI} from "../../../api/project";
import Text from "../Text";
import {getUserRole} from "../../../page/Profile/components/InformationProfile";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (selectedUser: IFullUser) => void;
}

const UserListModal = (props: Props) => {
    const {setVisible, onSubmit, visible} = props;
    const [selectedCompany, setSelectedCompany] = useState<string>("");
    const [selectedResponsible, setSelectedResponsible] = useState<any>(null);
    const tableFirstName = t("table.first_name");
    const tableLastName = t("table.last_name");
    const tableEmail = t("registration.email");
    const tableRole = t("table.role");
    const tableCompany = t("projects.company");

    const [responsibleSearch, setResponsibleSearch] = useState("");
    const [responsiblePage, setResponsiblePage] = useState(1);
    const [responsibleSize, setResponsibleSize] = useState(PAGE_SIZE);

    const params = useParams();

    // Запрос на получение списка организаций
    const {data: employmentData, isFetching: isFetchingEmploymentData} =
        projectAPI.useGetEmploymentInProjectQuery({
            params: {
                projectId: Number(params["projectID"]),
                contextProjectId: Number(params["projectID"]),
            },
        });

    // Запрос на получение списка пользователей проекта для назначения ответственным в замечаниях
    const {
        data: usersDataForTask,
        isLoading: responsibleLoading,
        refetch: usersForTaskRefetch,
    } = accountApi.useGetUsersForTaskQuery(
        {
            projectId: params["projectID"],
            searchStr: responsibleSearch,
            params: {
                page: responsiblePage - 1,
                size: responsibleSize,
                contextProjectId: params["projectID"],
                employmentId: employmentData?.domain?.find(
                    (item: any) => item?.name === selectedCompany,
                )?.id,
            },
        },
        {
            skip: !open,
        },
    );

    const onResponsiblePageChange = (page: number, pageSize: number) => {
        setResponsiblePage(page);
    };

    const responsibleColumns: ColumnsType<any> = [
        {
            title: "",
            dataIndex: "index",
            key: "0",
            filtered: true,
            render: (text, record: IUser) => {
                const indexOf = usersDataForTask?.domain?.indexOf(record) + 1;
                return (
                    <div
                        style={{
                            backgroundColor:
                                record?.id === selectedResponsible?.id
                                    ? "rgba(122, 130, 148, 0.6)"
                                    : "",
                            cursor: "pointer",
                        }}
                        onClick={() => setSelectedResponsible(record)}>
                        <Text
                            style={{
                                maxWidth: MAX_CELL_LENGTH_KEY + "px",
                            }}
                            ellipsis={{
                                tooltip: {
                                    overlayClassName: "Tooltip",
                                    title: text,
                                    placement: "topLeft",
                                },
                            }}
                            variant="p_r">
                            {indexOf}
                        </Text>
                    </div>
                );
            },
        },
        {
            title: tableFirstName,
            dataIndex: "name",
            key: "1",
            filtered: true,
            render: (text, record: IUser) => {
                return (
                    <div
                        style={{
                            backgroundColor:
                                record?.id === selectedResponsible?.id
                                    ? "rgba(122, 130, 148, 0.6)"
                                    : "",
                            cursor: "pointer",
                        }}
                        onClick={() => setSelectedResponsible(record)}>
                        <Text
                            style={{
                                maxWidth: MAX_CELL_LENGTH_FIRST_NAME + "px",
                            }}
                            variant="p_r">
                            {text}
                        </Text>
                    </div>
                );
            },
        },
        {
            title: tableLastName,
            dataIndex: "last_name",
            key: "2",
            filtered: true,
            render: (text, record: IUser) => {
                return (
                    <div
                        style={{
                            backgroundColor:
                                record?.id === selectedResponsible?.id
                                    ? "rgba(122, 130, 148, 0.6)"
                                    : "",
                            cursor: "pointer",
                        }}
                        onClick={() => setSelectedResponsible(record)}>
                        <Text
                            style={{
                                maxWidth: MAX_CELL_LENGTH_LAST_NAME + "px",
                            }}
                            ellipsis={{
                                tooltip: {
                                    overlayClassName: "Tooltip",
                                    title: text?.name,
                                    placement: "topLeft",
                                },
                            }}
                            variant="p_r">
                            {text}
                        </Text>
                    </div>
                );
            },
        },
        {
            title: tableEmail,
            dataIndex: "email",
            key: "6",
            filtered: true,
            render: (text, record: IUser) => {
                return (
                    <div
                        style={{
                            backgroundColor:
                                record?.id === selectedResponsible?.id
                                    ? "rgba(122, 130, 148, 0.6)"
                                    : "",
                            cursor: "pointer",
                        }}
                        onClick={() => setSelectedResponsible(record)}>
                        <Text
                            style={{
                                maxWidth: MAX_CELL_LENGTH_EMAIL - 60 + "px",
                            }}
                            variant="p_r">
                            {text}
                        </Text>
                    </div>
                );
            },
        },
        {
            title: tableRole,
            dataIndex: "headRole",
            key: "6",
            filtered: true,
            render: (text, record: IUser) => {
                return (
                    <div
                        style={{
                            backgroundColor:
                                record?.id === selectedResponsible?.id
                                    ? "rgba(122, 130, 148, 0.6)"
                                    : "",
                            cursor: "pointer",
                        }}
                        onClick={() => setSelectedResponsible(record)}>
                        <Text
                            style={{
                                maxWidth: MAX_CELL_LENGTH_ROLE + "px",
                            }}
                            variant="p_r">
                            {getUserRole(text)}
                        </Text>
                    </div>
                );
            },
        },
        {
            title: tableCompany,
            dataIndex: "organizationName",
            key: "6",
            filtered: true,
            render: (text, record: any) => {
                return (
                    <div
                        style={{
                            backgroundColor:
                                record?.id === selectedResponsible?.id
                                    ? "rgba(122, 130, 148, 0.6)"
                                    : "",
                            cursor: "pointer",
                        }}
                        onClick={() => setSelectedResponsible(record)}>
                        <Text
                            style={{
                                maxWidth: MAX_CELL_LENGTH_ORGANIZATION_USER + "px",
                            }}
                            variant="p_r">
                            {record?.employment?.name}
                        </Text>
                    </div>
                );
            },
        },
    ];

    const onSubmitModal = () => {
        onSubmit(selectedResponsible);
        setVisible(false);
        setResponsiblePage(1);
        setResponsibleSearch("");
        setSelectedCompany("");
        setSelectedResponsible(null);
        setResponsibleSize(10);
    };

    return (
        <AddListModal
            isOpen={visible}
            onCancel={() => {
                setVisible(false);
                setSelectedCompany("");
                setSelectedResponsible(null);
            }}
            onSubmit={onSubmitModal}
            searchSettings={{
                onChange: e => {
                    doSearch(text => setResponsibleSearch(text), e.target.value, 1000);
                },
                placeholder: t("users.user_search"),
            }}
            columns={responsibleColumns}
            tableSettings={{
                isLoading: responsibleLoading,
                columns: responsibleColumns,
                dataSource: usersDataForTask?.domain,
            }}
            paginationSettings={{
                current: responsiblePage,
                pageSize: responsibleSize,
                total: usersDataForTask?.totalElements,
                onChange: onResponsiblePageChange,
                disabled: responsibleLoading,
            }}
            countSettings={{
                isUpdateURL: false,
                onChange: count => {
                    setResponsibleSize(count);
                    usersForTaskRefetch();
                },
            }}
            filterSettings={{
                employments: {
                    data: employmentData?.domain?.map((item: any) => item?.name) ?? [],
                    selected: selectedCompany,
                    setSelected: setSelectedCompany,
                },
            }}
            titleModal={`${t("remarks.add_responsible_to_remark")}`}
        />
    );
};

export default UserListModal;