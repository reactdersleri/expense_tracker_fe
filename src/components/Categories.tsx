import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import { SketchPicker } from "react-color";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { AppState } from "../store";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../store/actions/categoryAction";
import { Category } from "../types/category";
import { CategoryForm } from "../types/category";
import { Mode } from "../types/general";

//**Bir kategori form adında kategori create ve update ederken lazım olan değişkenleri tanımladık ve useState'de kullanabilmek için boş halinde hangi default değerleri alması gerketiğini yazdık */
const emptyForm: CategoryForm = {
  name: "",
  type: "income",
  color: "black",
};

function Categories() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [updateId, setUpdateID] = useState<number | null>(null);
  const [deleteId, setDeleteID] = useState<number | null>(null);

  const showModal = (mode: Mode) => {
    //**Mode değerine göre create or update action creator fonksiyonu çağır */
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") {
      dispatch(addCategory(form));
    } else if (mode === "edit") {
      dispatch(updateCategory(form, updateId as number));
    } else if (mode === "delete") {
      dispatch(deleteCategory(deleteId as number));
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

  // const handleDelete = (updateId : upl) => {

  // }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}> {text.toUpperCase()} </Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <a>
            <EditOutlined
              onClick={() => {
                showModal("edit");
                setForm(category);
                setUpdateID(category.id);
              }}
              style={{ color: "#0390fc" }}
            />
          </a>
          <a>
            <DeleteOutlined
              onClick={() => {
                showModal("delete");
                setDeleteID(category.id);
              }}
              style={{ color: "#c20808" }}
            />
          </a>
        </Space>
      ),
    },
  ];
  //**Burada en azından boş bile olsa [] yazmazsak sürekli çalışacaktır sadece render edildiğinde çalışması için [] koymalıyız */
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <div>
        <Button type="primary" onClick={() => showModal("new")}>
          New Category
        </Button>
      </div>
      <Modal
        title={
          mode === "new"
            ? "Create New Category"
            : mode === "edit"
            ? "Update Category"
            : "Delete Category"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !(mode==="delete") && !form.name }}
        >
        {mode === "new" || mode === "edit" ? (
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Category Name">
              <Input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Category Type">
              <Select
                defaultValue="expense"
                value={form.type}
                onChange={(type) => setForm({ ...form, type })}
              >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Color">
              <SketchPicker
                color={form.color}
                onChange={(color) => setForm({ ...form, color: color.hex })}
              />
            </Form.Item>
          </Form>
        ) : mode === "delete" ? (
          <>Are you sure ?</>
        ) : null}
      </Modal>
      <Table loading={loading} columns={columns} dataSource={data} rowKey="id"/>
    </>
  );
}

export default Categories;
