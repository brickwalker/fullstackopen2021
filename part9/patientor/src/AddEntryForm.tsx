import {
  Formik,
  Form as FormikForm,
  Field as FormikField,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import * as React from "react";
import { useState } from "react";
import { Button, Select, Input, Header } from "semantic-ui-react";
import axios from "axios";
import { HealthCheckRating, Patient, EntryWithoutId, Entry } from "./types";
import { NumberField } from "./AddPatientModal/FormField";
import { addEntry, useStateValue } from "./state";
import { apiBaseUrl } from "./constants";

interface Props {
  onCancel: () => void;
}

const entryType = ["OccupationalHealthcare", "HealthCheck", "Hospital"];
const selectOptions = entryType.map((entry) => ({
  key: entry,
  value: entry,
  text: entry,
}));

const CheckType = ({ onContinue }: { onContinue: (value: string) => void }) => {
  return (
    <Formik
      initialValues={{
        type: "",
      }}
      validationSchema={Yup.object({
        type: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        onContinue(values.type);
      }}
    >
      {({ values, setFieldValue }) => {
        const handleSelect = (
          e: React.SyntheticEvent<HTMLElement>,
          { name, value }: { name: string; value: string }
        ) => setFieldValue(name, value);
        return (
          <FormikForm>
            <FormikField
              as={Select}
              name="type"
              placeholder="Select entry type"
              options={selectOptions}
              values={values.type}
              onChange={handleSelect}
              onBlur={() => false}
            />
            <ErrorMessage name="type" />
            <br />
            <Button type="submit" floated="right" color="green">
              Continue
            </Button>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

const OccupationalHealthcare = ({
  submitNewEntry,
}: {
  submitNewEntry: (values: EntryWithoutId) => void;
}) => {
  return (
    <div>
      <Header as="h2">Occupational Healthcare</Header>
      <Formik
        initialValues={{
          type: "OccupationalHealthcare",
          date: "",
          specialist: "",
          description: "",
          employerName: "",
        }}
        validationSchema={Yup.object({
          type: Yup.string(),
          date: Yup.string()
            .required("Required")
            .matches(/^\d{4}-\d{2}-\d{2}$/),
          specialist: Yup.string().required("Required").min(3).max(20),
          description: Yup.string().required("Required").min(5).max(100),
          employerName: Yup.string().required("Required").min(2).max(20),
        })}
        onSubmit={(values) => submitNewEntry(values as EntryWithoutId)}
      >
        <FormikForm>
          <FormikField as={Input} name="date" placeholder="YYYY-MM-DD" />
          <ErrorMessage name="date" />
          <br />
          <FormikField as={Input} name="specialist" placeholder="Specialist" />
          <ErrorMessage name="specialist" />
          <br />
          <FormikField as={Input} name="employerName" placeholder="Employer" />
          <ErrorMessage name="employerName" />
          <br />
          <FormikField
            as={Input}
            name="description"
            placeholder="Description"
            fluid
          />
          <ErrorMessage name="description" />
          <br />
          <Button type="submit" floated="right" color="green">
            Add
          </Button>
        </FormikForm>
      </Formik>
    </div>
  );
};

const Hospital = ({
  submitNewEntry,
}: {
  submitNewEntry: (values: EntryWithoutId) => void;
}) => {
  return (
    <div>
      <Header as="h2">Hospital</Header>
      <Formik
        initialValues={{
          type: "Hospital",
          date: "",
          specialist: "",
          description: "",
          dischargeDate: "",
          dischargeCriteria: "",
        }}
        validationSchema={Yup.object({
          type: Yup.string(),
          date: Yup.string()
            .required("Required")
            .matches(/^\d{4}-\d{2}-\d{2}$/),
          specialist: Yup.string().required("Required").min(3).max(20),
          description: Yup.string().required("Required").min(5).max(100),
          dischargeDate: Yup.string()
            .required("Required")
            .matches(/^\d{4}-\d{2}-\d{2}$/),
          dischargeCriteria: Yup.string().required("Required").min(5).max(100),
        })}
        onSubmit={(values) => {
          const { dischargeDate, dischargeCriteria, ...rest } = values;
          const transformedValues = {
            ...rest,
            discharge: { date: dischargeDate, criteria: dischargeCriteria },
          };
          submitNewEntry(transformedValues as EntryWithoutId);
        }}
      >
        <FormikForm>
          <FormikField as={Input} name="date" placeholder="YYYY-MM-DD" />
          <ErrorMessage name="date" />
          <br />
          <FormikField as={Input} name="specialist" placeholder="Specialist" />
          <ErrorMessage name="specialist" />
          <br />
          <FormikField
            as={Input}
            name="dischargeDate"
            placeholder="Discharge YYYY-MM-DD"
          />
          <ErrorMessage name="dischargeDate" />
          <br />
          <FormikField
            as={Input}
            name="dischargeCriteria"
            placeholder="Discharge criteria"
          />
          <ErrorMessage name="dischargeCriteria" />
          <br />
          <FormikField
            as={Input}
            name="description"
            placeholder="Description"
            fluid
          />
          <ErrorMessage name="description" />
          <br />
          <Button type="submit" floated="right" color="green">
            Add
          </Button>
        </FormikForm>
      </Formik>
    </div>
  );
};

const HealthCheck = ({
  submitNewEntry,
}: {
  submitNewEntry: (values: EntryWithoutId) => void;
}) => {
  return (
    <div>
      <Header as="h2">Health Check</Header>
      <Formik
        initialValues={{
          type: "HealthCheck",
          date: "",
          specialist: "",
          description: "",
          healthCheckRating: 0,
        }}
        validationSchema={Yup.object({
          type: Yup.string(),
          date: Yup.string()
            .required("Required")
            .matches(/^\d{4}-\d{2}-\d{2}$/),
          specialist: Yup.string().required("Required").min(3).max(20),
          description: Yup.string().required("Required").min(5).max(100),
          healthCheckRating: Yup.mixed().oneOf(
            Object.values(HealthCheckRating)
          ),
        })}
        onSubmit={(values) => submitNewEntry(values as EntryWithoutId)}
      >
        <FormikForm>
          <FormikField as={Input} name="date" placeholder="YYYY-MM-DD" />
          <ErrorMessage name="date" />
          <br />
          <FormikField as={Input} name="specialist" placeholder="Specialist" />
          <ErrorMessage name="specialist" />
          <br />
          <FormikField
            component={NumberField}
            name="healthCheckRating"
            label="Health check rating "
            min={0}
            max={3}
          />
          <ErrorMessage name="healthCheckRating" />
          <br />
          <FormikField
            as={Input}
            name="description"
            placeholder="Description"
            fluid
          />
          <ErrorMessage name="description" />
          <br />
          <Button type="submit" floated="right" color="green">
            Add
          </Button>
        </FormikForm>
      </Formik>
    </div>
  );
};

const AddEntryForm = ({ onCancel }: Props) => {
  const [type, setType] = useState<string>("");

  const [{ currentPatient }, dispatch] = useStateValue();

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/patients/${(currentPatient as Patient).id}/entries`,
        values
      );
      const newEntry = response.data as Entry;
      dispatch(addEntry(currentPatient as Patient, newEntry));
      onCancel();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data || "Unknown Error");
      }
    }
  };

  return (
    <div>
      {!type && <CheckType onContinue={(value: string) => setType(value)} />}
      {type === "OccupationalHealthcare" && (
        <OccupationalHealthcare submitNewEntry={submitNewEntry} />
      )}
      {type === "HealthCheck" && (
        <HealthCheck submitNewEntry={submitNewEntry} />
      )}
      {type === "Hospital" && <Hospital submitNewEntry={submitNewEntry} />}
      <Button onClick={onCancel} color="red">
        Cancel
      </Button>
    </div>
  );
};

export default AddEntryForm;
