import { Form, Header } from "semantic-ui-react";
import ImagePreview from "./ImagePreview";

import "./NftForm.scss";

export default function NftForm({
  formData,
  handleChange,
  handleSubmit,
  setLoading,
}) {
  return (
    <Form id="nft-form" className="nft-form" encType="multipart/form-data">
      <Form.Group grouped>
        <ImagePreview
          setImage={(filename, imageData) => {
            handleChange("imageName", filename);
            handleChange("image", imageData);
          }}
          setLoading={setLoading}
        />

        <Form.Input
          placeholder="Item name"
          onChange={(object, { value }) => {
            handleChange("title", value);
          }}
        />
        <Form.Input
          placeholder="Name"
          onChange={(object, { value }) => {
            handleChange("creator", value);
          }}
        />
        <Form.TextArea
          placeholder="Description"
          onChange={(object, { value }) => {
            handleChange("description", value);
          }}
        />
      </Form.Group>

      {/*<Form.Group grouped>
        <Header as="h5">Lege die Nutzungsbedingungen fest</Header>
        <Form.Radio
          label="kommerzielle Nutzung erlaubt"
          value="commerce"
          checked={formData.commerce}
          onChange={(object, {value, checked}) => {
            handleChange(value, checked);
          }}
          toggle={true}
        />
        <Form.Radio
          label="Remixen, Verändern und Erweitern erlaubt"
          value="remix"
          checked={formData.remix}
          onChange={(object, {value, checked}) => {
            handleChange(value, checked);
          }}
          toggle={true}
        />
      </Form.Group>*/}

      <Form.Group grouped>
        <Form.Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Create
        </Form.Button>
      </Form.Group>
    </Form>
  );
}
