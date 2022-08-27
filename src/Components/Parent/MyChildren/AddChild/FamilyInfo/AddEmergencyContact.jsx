import React, {useState} from "react";
import { Form, Input, Button, Icon, Dropdown } from "semantic-ui-react";
export function AddEmergencyContact(props) {
  const [error, setError] = useState({message:"", field: []})
  let {
      childForm,
      loginUserInfo,
      subForm,
      showButtonLoader,
      stateDropdown
    } = props,
    { emergencyContact1, emergencyContact2, parent1, parent2 } = childForm,
    value =
      subForm === "emergencyContact1" ? emergencyContact1 : emergencyContact2,
    validator =
      subForm === "emergencyContact1"
        ? props.emeregency1FormValidator
        : props.emeregency2FormValidator,
    nextModal =
      subForm === "emergencyContact1"
        ? "emergencyContact2"
        : "medicalInformation",
    modalType =
      subForm === "emergencyContact1"
        ? "emergencyContact1"
        : "emergencyContact2";
    const isValidField = (modalName) => {
      // if(value.phone1 && value.phone1 === value.phone2){
      //   setError({message:"Phone 1 and phone 2 should be unique", field: ["phone1","phone2"]})
      //   return true;
      // }
      if(value.phone1 && modalName.phone1 === value.phone1){
        setError({message:"Phone 1 number should be different then parent1 and parent2 form", field: ["phone1"]})
        return true;
      }
      if(value.phone2 && modalName.phone2 === value.phone2){
        setError({message:"Phone 2 number should be different then parent1 and parent2 form", field: ["phone2"]})
        return true;
      }
      if(value.email1 && modalName.email1 === value.email1){
        setError({message:"Email should be different then parent1 and parent2 form", field: ["email1"]})
        return true;
      }
      
      return false;
    }
    const validateFormFields = (e) => {
      e.preventDefault();
      // Check phone1, phone2 and email should not be duplicate in others forms
      if(!isValidField(parent1) && !isValidField(parent2) && !isValidField(subForm === "emergencyContact1" ? emergencyContact2 : emergencyContact1)){
        
        setError({message:"", field: ""})
        props._saveForm(validator, modalType, "familyInfo", nextModal)
      }
    }
  return (
    <Form
      id={
        subForm === "emergencyContact1"
          ? "emergencyContact1"
          : "emergencyContact2"
      }
      name="emergencyInfo"
      onSubmit={validateFormFields}
      // onSubmit={() =>
      //   props._saveForm(validator, modalType, "familyInfo", nextModal)
      // }
    >
      <div className="ui negative message">
        {/* <div className="header">We&#x27;re sorry we can&#x27;t apply that discount</div> */}
        <p>Emergency contact information can not be same as Parent1 or Parent2 information</p>
      </div>
      <Form.Group widths="equal">
        <Form.Field inline required>
          <label> First Name</label>
          <Input
            type="text"
            name="first_name"
            value={value.first_name}
            onChange={event => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("first_name", value.first_name, "required|alpha")}
        </Form.Field>
        <Form.Field inline required>
          <label> Last Name</label>
          <Input
            type="text"
            name="last_name"
            value={value.last_name}
            onChange={event => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("last_name", value.last_name, "required|alpha")}
        </Form.Field>
        <Form.Field inline required>
          <label>Phone 1</label>
          <Input
            type="text"
            name="phone1"
            value={value.phone1}
            // onChange={event => validateFormFields(event)}
            onChange={event => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("phone1", value.phone1, "required|phone")}
          {error.field.includes("phone1") ? <div className="srv-validation-message">{error.message}</div> : ""}
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field inline required>
          <label>Phone 2</label>
          <Input
            type="text"
            name="phone2"
            value={value.phone2}
            onChange={event => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("phone2", value.phone2, "required|phone")}
          {error.field.includes("phone2") ? <div className="srv-validation-message">{error.message}</div> : ""}
          
        </Form.Field>
        <Form.Field inline required>
          <label>Email 1</label>
          <Input
            type="email"
            name="email1"
            value={value.email1}
            onChange={event => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("email1", value.email1, "required|email")}
          {error.field.includes("email1") ? <div className="srv-validation-message">{error.message}</div> : ""}

        </Form.Field>
        <Form.Field inline required>
          <label>Address 1</label>
          <Input
            type="text"
            name="address"
            value={value.address}
            onChange={event => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("address", value.address, "required")}
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field inline required>
          <label>City</label>
          <Input
            type="text"
            name="city"
            value={value.city}
            onChange={event => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("city", value.city, "required")}
        </Form.Field>

        <Form.Field inline required>
          <label>State</label>
          <Dropdown
            placeholder="Select State"
            fluid
            search
            selection
            options={stateDropdown}
            name="state"
            value={value.state}
            onChange={(event, { value, name }) =>
              props._handleFormDropDown(modalType, event, value, name)
            }
          />
          {validator.message("state", value.state, "required")}
        </Form.Field>

        {/* <Form.Field inline required>
          <label>State</label>
          <Input type="text" name='state' value={value.state} onChange={(event) => props._handleFormInput(modalType, event)} fluid />
          {validator.message('state', value.state, 'required')}
        </Form.Field> */}

        <Form.Field inline required>
          <label>Zipcode</label>
          <Input
            type="number"
            className="no-arrow"
            name="zip_code"
            value={value.zip_code}
            onChange={event => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("zip_code", value.zip_code, "required")}
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field inline required>
          <label>Relationship</label>
          <Input
            type="text"
            name="relationship"
            value={value.relationship}
            onChange={event => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("relationship", value.relationship, "required")}
        </Form.Field>
        <Form.Field />
        <Form.Field />
      </Form.Group>

      <Form.Group>
        <div className="field">
          <div className="ui checkbox">
            <input
              type="checkbox"
              name="has_emergency_release"
              checked={value.has_emergency_release}
              value={value.has_emergency_release}
              onChange={event => props._handleCheckBox(modalType, event)}
            />
            <label>Allow to pick up parent</label>
          </div>
        </div>
      </Form.Group>
      {/* <Form.Group>
        <Form.Field>
          <Button positive type="submit" disabled={showButtonLoader}>
            {loginUserInfo.role_id === 2 ? (
              showButtonLoader ? (
                <Icon loading name="spinner" />
              ) : (
                "Update"
              )
            ) : showButtonLoader ? (
              <Icon loading name="spinner" />
            ) : (
              "Submit"
            )}
          </Button>
        </Form.Field>
      </Form.Group> */}
      <Form.Group>
        <Form.Field>
          
          {loginUserInfo.role_id === 2 ? 
            <Button positive type="submit" disabled={showButtonLoader}>
              {showButtonLoader ? (
                <Icon loading name="spinner" />
              ) : (
                "Update"
              )}
              </Button>
              :(modalType=="emergencyContact2" ?
                <Button positive type="submit" disabled={showButtonLoader}>
                {showButtonLoader ? (
                  <Icon loading name="spinner" />
                ) : (
                  "Submit"
                )}
                </Button>
              :
              <Button positive onClick={
                ()=>props._handleNext(
                  validator, modalType, "familyInfo", nextModal
                )
              } disabled={showButtonLoader}>
               {showButtonLoader ? (
                <Icon loading name="spinner" />
              ) : (
                "Next"
              )}
              </Button>
               )
              }
        </Form.Field>
      </Form.Group>
    </Form>
  );
}
