import {Form, Header} from "semantic-ui-react";
import ImagePreview from "./ImagePreview";

import "./NftForm.css";

export default function NftForm({formData, handleChange, handleSubmit, setLoading}) {
  return (
    <Form className="nft-form" encType="multipart/form-data">
      <Form.Group grouped>
        <ImagePreview
          setImage={(imageData) => {
            handleChange("image", imageData);
          }}
          setLoading={setLoading}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Name der Arbeit"
          placeholder="Name der Arbeit"
          onChange={(object, {value}) => {
            handleChange("name", value);
          }}
        />
      </Form.Group>

      <Form.Group grouped>
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
      </Form.Group>

      <Form.Group grouped>
        <Form.Button
          onClick={() => {
            console.log("SUBMIT BUTTON CLICKED!");
            handleSubmit();
          }}
        >
          Submit
        </Form.Button>
      </Form.Group>
    </Form>
  );
}
