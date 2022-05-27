import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from "../store/actions/recordAction";
import { Record, RecordForm } from "../types/record";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Category } from "../types/category";
import axios from "axios";
import { Mode } from "../types/general";
import { getCategories } from "../store/actions/categoryAction";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

function Records() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );
  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );
  const [countryCode, setCountryCode] = useState<string | null>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [updateId, setUpdateID] = useState<number | null>(null);
  const [deleteId, setDeleteID] = useState<number | null>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") {
      dispatch(addRecord(form));
    } else if (mode === "edit") {
      dispatch(updateRecord(form, updateId as number));
    } else if (mode === "delete") {
      dispatch(deleteRecord(deleteId as number));
    }
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateID(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateID(null);
    setDeleteID(null);
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  /**
   ** Location bilgisini almak için kullanılan method
   */
  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let code = response.data.country_code;
        setCountryCode(code);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"], category: Record) => {
        return (
          <>
            {countryCode === "TR" &&
              Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return (
          <Tag color={category.color}> {category.name.toUpperCase()} </Tag>
        );
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => {
        return <> {new Date(updatedAt).toLocaleDateString()} </>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space size="middle">
            <a>
              <EditOutlined
                onClick={() => {
                  showModal("edit");
                  setForm({title, amount, category_id});
                  setUpdateID(record.id);
                }}
                style={{ color: "#0390fc" }}
              />
            </a>
            <a>
              <DeleteOutlined
                onClick={() => {
                  showModal("delete");
                  setDeleteID(record.id);
                }}
                style={{ color: "#c20808" }}
              />
            </a>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getRecords());
    !categories.length && dispatch(getCategories());
  }, []);

  const isFormValid = !(
    form.title ||
    form.amount === 0 ||
    form.category_id === 0
  );

  return (
    <>
      <div>
        <Button type="primary" onClick={() => showModal("new")}>
          New Records
        </Button>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} rowKey="id"/>
      <Modal
        title={
          mode === "new"
            ? "Create New Records"
            : mode === "edit"
            ? "Update Records"
            : "Delete Records"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !(mode === "delete") && isFormValid }}
      >
        {mode === "new" || mode === "edit" ? (
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Records Name">
              <Input
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Amount">
              <Input
                name="amount"
                value={form.amount}
                type="number"
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
              />
            </Form.Item>
            <Form.Item label="Category Type">
              <Select
                defaultValue={form.category_id}
                value={form.category_id}
                onChange={(category_id) => setForm({ ...form, category_id })}
              >
                <Select.Option value={0} disabled>
                  Select Category
                </Select.Option>
                {categories.map((category) => {
                  return (
                    <Select.Option value={category.id} key={category.id}>
                      {category.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        ) : mode === "delete" ? (
          <>Are you sure ?</>
        ) : null}
      </Modal>
    </>
  );
}

export default Records;
