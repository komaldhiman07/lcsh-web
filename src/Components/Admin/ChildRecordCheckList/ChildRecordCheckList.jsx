import React, { Component } from "react";
import {
  Container,
  Grid,
  Form,
  Button,
  TextArea,
  Table,
  Header,
  Rating,
} from "semantic-ui-react";
import ReactToPrint from "react-to-print";

import { connect } from "react-redux";
import { ExportToCsv } from "export-to-csv";
import {
  getStudentCheckList,
  viewAdminClassList,
} from "../../../ApiAction/Admin";
import constants from "../../constants";
import moment from "moment";
// Bootstrap and jQuery libraries

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
// ✔️
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import "./ChildRecordCheckList.css";
import { CookiePolicy } from "../../Shared";
class ChildRecordCheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childRecordCheckList: [],
      modalType: "",
      modalHeader: "",
      modalDescription: "",
      modalOpen: false,
      studentchecklist: null,
      apiStatusCode: null,
      loading: false,
      page_number: 1,
      page_size: 20,
      total_records: 0,
      class_id: null,
      allClassesInfo: [],
      printableTempHeader: [],
      printableTempData: [],
      tableHeader: [
        { name: "  Abel   ", dob: "09/03/2021" },
        { name: "Abiathar", dob: "2021-09-25" },
      ],
      tableData: [
        {
          heading: "Date of Admission",
          row: [
            { value: "09/03/2021", date: "2021-09-09" },
            { value: "2021-09-14", date: "2021-09-14" },
          ],
        },
        {
          heading: "  1st Aid/Emergency Medical Consent & Release*",
          row: [
            { value: "✔", date: "" },
            { value: "✔", date: "" },
          ],
        },
        {
          heading: "Off site consent",
          row: [
            { value: "✔", date: "" },
            { value: "✔", date: "" },
          ],
        },
        {
          heading: "Regular Medications",
          row: [
            { value: "❌", date: "❌" },
            { value: "❌", date: "❌" },
          ],
        },
        {
          heading: "Transportation Plan",
          row: [
            { value: "❌", date: "" },
            { value: "❌", date: "" },
          ],
        },
        {
          heading: "Authorization And Consent Agreement ",
          row: [
            { value: "❌", date: "" },
            { value: "❌", date: "" },
          ],
        },
        {
          heading: "Developmental History",
          row: [
            { value: "❌", date: "❌" },
            { value: "❌", date: "❌" },
          ],
        },
        {
          heading: "Date of last Physical Exam",
          row: [
            { value: "", date: "" },
            { value: "", date: "" },
          ],
        },
        {
          heading: "Lead screening",
          row: [
            { value: "", date: "" },
            { value: "", date: "" },
          ],
        },
        {
          heading: "Immunizations",
          row: [
            { value: "❌", date: "" },
            { value: "❌", date: "" },
          ],
        },
        {
          heading: "Parent Agreement",
          row: [
            { value: "❌", date: "" },
            { value: "❌", date: "" },
          ],
        },
        {
          heading: "  Local Field/Field trips    ",
          row: [
            { value: "❌", date: "" },
            { value: "❌", date: "" },
          ],
        },
        {
          heading: "Sunscreen Permission",
          row: [
            { value: "❌", date: "" },
            { value: "❌", date: "" },
          ],
        },
        {
          heading: "  Tooth Brushing ",
          row: [
            { value: "❌", date: "" },
            { value: "❌", date: "" },
          ],
        },
        {
          heading: "  Photograph Permission    ",
          row: [
            { value: "❌", date: "" },
            { value: "❌", date: "" },
          ],
        },
        {
          heading: "Directory Permission",
          row: [
            { value: "✔", date: "" },
            { value: "✔", date: "" },
          ],
        },
      ],
      csvData: [
        {
          "Child Name and Date of Birth": "Date of Admission",
          Abel: "09/11/2021",
          Abiathar: "09/14/2021",
        },
        {
          "Child Name and Date of Birth":
            "  1st Aid/Emergency Medical Consent & Release*",
          Abel: "✔",
          Abiathar: "✔",
        },
        {
          "Child Name and Date of Birth": "Off site consent",
          Abel: "✔",
          Abiathar: "✔",
        },
        {
          "Child Name and Date of Birth": "Regular Medications",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth": "Transportation Plan",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth":
            "Authorization And Consent Agreement ",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth": "Developmental History",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth": "Date of last Physical Exam",
          Abel: "",
          Abiathar: "",
        },
        {
          "Child Name and Date of Birth": "Lead screening",
          Abel: "",
          Abiathar: "",
        },
        {
          "Child Name and Date of Birth": "Immunizations",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth": "Parent Agreement",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth": "  Local Field/Field trips    ",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth": "Sunscreen Permission",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth": "  Tooth Brushing ",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth": "  Photograph Permission    ",
          Abel: "❌",
          Abiathar: "❌",
        },
        {
          "Child Name and Date of Birth": "Directory Permission",
          Abel: "✔",
          Abiathar: "✔",
        },
      ],
    };
    this.printRef = React.createRef();
  }
  formatDate = (date) => {
    return date ? moment(date).format("MM/DD/YYYY") : "";
  };
  getRowValues = (item) => {
    const tempHeader = {
      name: `${item.first_name} ${item.last_name}`,
      dob: this.formatDate(item.birth_date),
    };
    // alert(  item.healthReport[0]?.regular_medications  )

    const tempAddmissionDate = {
      value: item.admission_date ? this.formatDate(item.admission_date) : "❌",
      date: item.admission_date ? this.formatDate(item.admission_date) : "",
    };
    const tempFirstAidEmergencyMedicalRelease = {
      value: item.emergencyInfo[0]?.has_emergency_release ? "✔" : "❌",
      date: item.emergencyInfo[0]?.has_emergency_release ? "✔" : "",
    };
    const tempOffSiteConsent = {
      value: item.authorizationAndConsent[0]
        ?.has_authorize_and_consent_agreement
        ? "✔"
        : "❌",
      date: item.authorizationAndConsent[0]?.has_authorize_and_consent_agreement
        ? "✔"
        : "",
    };
    const tempTransportAuthority = {
      value: item.transportAuthority[0]?.has_program_bus_van ? "✔" : "❌",
      date: item.transportAuthority[0]?.has_program_bus_van ? "✔" : "",
    };
    const tempRegualrMedication = {
      value: item.healthReport[0]?.regular_medications
        ? item.healthReport[0]?.regular_medications
        : "❌",
      date: item.healthReport[0]?.regular_medications
        ? item.healthReport[0]?.regular_medications
        : "❌",
    };

    const tempAuthorizationAndConsent = {
      value: item.authorizationAndConsent[0]
        ?.has_authorize_and_consent_agreement
        ? "✔"
        : "❌",
      date: item.authorizationAndConsent[0]?.has_authorize_and_consent_agreement
        ? "✔"
        : "",
    };

    const tempDevelopmental_history = {
      value: item.devReport[0] ? "✔" : "❌",
      date: item.devReport[0] ? "✔" : "❌",
    };
    const tempLastPhysicalDate = {
      value: item.medicalInfo[0]?.last_physical_date
        ? this.formatDate(item.medicalInfo[0]?.last_physical_date)
        : "",
      date: item.medicalInfo[0]?.last_physical_date
        ? this.formatDate(item.medicalInfo[0]?.last_physical_date)
        : "",
    };

    const tempLeadScreening = {
      value: item.medicalInfo[0]?.lead_screen_date
        ? this.formatDate(item.medicalInfo[0]?.lead_screen_date)
        : "",
      date: item.medicalInfo[0]?.lead_screen_date
        ? this.formatDate(item.medicalInfo[0]?.lead_screen_date)
        : "",
    };
    const tempImmunization = {
      value: item.medicalInfo[0]?.immunizations ? "✔" : "❌",
      date: item.medicalInfo[0]?.immunizations
        ? item.medicalInfo[0]?.immunizations
        : "",
    };

    const tempParentAgreement = {
      value: item.parentAgreement[0]?.has_parent_agreed_with_policies
        ? "✔"
        : "❌",
      date: item.parentAgreement[0]?.has_parent_agreed_with_policies
        ? item.parentAgreement[0]?.has_parent_agreed_with_policies
        : "",
    };
    const tempLocalTripPermission = {
      value: item.localTripPermission[0]?.has_parent_agreed_for_trip
        ? "✔"
        : "❌",
      date: item.localTripPermission[0]?.has_parent_agreed_for_trip
        ? item.localTripPermission[0]?.has_parent_agreed_for_trip
        : "",
    };
    const tempSunScreenPermission = {
      value: item.sunscreenPermission[0]?.has_sunscreen_provided_by_school
        ? "✔"
        : "❌",
      date: item.sunscreenPermission[0]?.has_sunscreen_provided_by_school
        ? item.sunscreenPermission[0]?.has_sunscreen_provided_by_school
        : "",
    };
    const tempToothBrushing = {
      value: item.toothBrushingInformation[0]?.has_participate_in_toothbrushing
        ? item.toothBrushingInformation[0]?.has_participate_in_toothbrushing !==
          "no"
          ? "✔"
          : "❌"
        : "❌",
      date: item.toothBrushingInformation[0]?.has_participate_in_toothbrushing
        ? item.toothBrushingInformation[0]?.has_participate_in_toothbrushing
        : "",
    };

    const tempPhotoRelease = {
      value: item.photoRelease[0]?.has_photo_permission_granted
        ? item.photoRelease[0]?.has_photo_permission_granted !== "no"
          ? "✔"
          : "❌"
        : "❌",
      date: item.photoRelease[0]?.has_photo_permission_granted
        ? item.photoRelease[0]?.has_photo_permission_granted
        : "",
    };
    const tempDirectoryPermission = {
      value: item.schoolDirectory[0]?.has_parent_wish_to_add_school_directory
        ? "✔"
        : "❌",
      date: item.schoolDirectory[0]?.has_parent_wish_to_add_school_directory
        ? item.schoolDirectory[0]?.has_parent_wish_to_add_school_directory
        : "",
    };
    return {
      tempHeader,
      tempAddmissionDate,
      tempFirstAidEmergencyMedicalRelease,
      tempOffSiteConsent,
      tempTransportAuthority,
      tempRegualrMedication,
      tempAuthorizationAndConsent,
      tempDevelopmental_history,
      tempLastPhysicalDate,
      tempLeadScreening,
      tempImmunization,
      tempParentAgreement,
      tempLocalTripPermission,
      tempSunScreenPermission,
      tempToothBrushing,
      tempPhotoRelease,
      tempDirectoryPermission,
    };
  };
  formatTableData = (data) => {
    var tempHeader = [];
    var tempData = [];

    var tempAddmissionDate = [];
    var tempFirstAidEmergencyMedicalRelease = [];
    var tempOffSiteConsent = [];
    var tempTransportAuthority = [];
    var tempRegualrMedication = [];
    var tempAuthorizationAndConsent = [];

    var tempDevelopmental_history = [];
    var tempLastPhysicalDate = [];
    var tempLeadScreening = [];
    var tempImmunization = [];

    var tempParentAgreement = [];
    var tempLocalTripPermission = [];
    var tempSunScreenPermission = [];
    var tempToothBrushing = [];
    var tempPhotoRelease = [];
    var tempDirectoryPermission = [];

    // console.log("Checklist Data : : " + JSON.stringify(res.data))
    data.forEach((item) => {
      tempHeader.push({
        name: `${item.first_name} ${item.last_name}`,
        dob: this.formatDate(item.birth_date),
      });
      // alert(  item.healthReport[0]?.regular_medications  )

      tempAddmissionDate.push({
        value: item.admission_date
          ? this.formatDate(item.admission_date)
          : "❌",
        date: item.admission_date ? this.formatDate(item.admission_date) : "",
      });
      tempFirstAidEmergencyMedicalRelease.push({
        value: item.emergencyInfo[0]?.has_emergency_release ? "✔" : "❌",
        date: item.emergencyInfo[0]?.has_emergency_release ? "✔" : "",
      });
      tempOffSiteConsent.push({
        value: item.authorizationAndConsent[0]
          ?.has_authorize_and_consent_agreement
          ? "✔"
          : "❌",
        date: item.authorizationAndConsent[0]
          ?.has_authorize_and_consent_agreement
          ? "✔"
          : "",
      });
      tempTransportAuthority.push({
        value: item.transportAuthority[0]?.has_program_bus_van ? "✔" : "❌",
        date: item.transportAuthority[0]?.has_program_bus_van ? "✔" : "",
      });
      tempRegualrMedication.push({
        value: item.healthReport[0]?.regular_medications
          ? item.healthReport[0]?.regular_medications
          : "❌",
        date: item.healthReport[0]?.regular_medications
          ? item.healthReport[0]?.regular_medications
          : "❌",
      });

      tempAuthorizationAndConsent.push({
        value: item.authorizationAndConsent[0]
          ?.has_authorize_and_consent_agreement
          ? "✔"
          : "❌",
        date: item.authorizationAndConsent[0]
          ?.has_authorize_and_consent_agreement
          ? "✔"
          : "",
      });

      tempDevelopmental_history.push({
        value: item.devReport[0] ? "✔" : "❌",
        date: item.devReport[0] ? "✔" : "❌",
      });
      tempLastPhysicalDate.push({
        value: item.medicalInfo[0]?.last_physical_date
          ? this.formatDate(item.medicalInfo[0]?.last_physical_date)
          : "",
        date: item.medicalInfo[0]?.last_physical_date
          ? this.formatDate(item.medicalInfo[0]?.last_physical_date)
          : "",
      });
      tempLeadScreening.push({
        value: item.medicalInfo[0]?.lead_screen_date
          ? this.formatDate(item.medicalInfo[0]?.lead_screen_date)
          : "",
        date: item.medicalInfo[0]?.lead_screen_date
          ? this.formatDate(item.medicalInfo[0]?.lead_screen_date)
          : "",
      });
      tempImmunization.push({
        value: item.medicalInfo[0]?.immunizations ? "✔" : "❌",
        date: item.medicalInfo[0]?.immunizations
          ? item.medicalInfo[0]?.immunizations
          : "",
      });

      tempParentAgreement.push({
        value: item.parentAgreement[0]?.has_parent_agreed_with_policies
          ? "✔"
          : "❌",
        date: item.parentAgreement[0]?.has_parent_agreed_with_policies
          ? item.parentAgreement[0]?.has_parent_agreed_with_policies
          : "",
      });
      tempLocalTripPermission.push({
        value: item.localTripPermission[0]?.has_parent_agreed_for_trip
          ? "✔"
          : "❌",
        date: item.localTripPermission[0]?.has_parent_agreed_for_trip
          ? item.localTripPermission[0]?.has_parent_agreed_for_trip
          : "",
      });
      tempSunScreenPermission.push({
        value: item.sunscreenPermission[0]?.has_sunscreen_provided_by_school
          ? "✔"
          : "❌",
        date: item.sunscreenPermission[0]?.has_sunscreen_provided_by_school
          ? item.sunscreenPermission[0]?.has_sunscreen_provided_by_school
          : "",
      });
      tempToothBrushing.push({
        value: item.toothBrushingInformation[0]
          ?.has_participate_in_toothbrushing
          ? item.toothBrushingInformation[0]
              ?.has_participate_in_toothbrushing !== "no"
            ? "✔"
            : "❌"
          : "❌",
        date: item.toothBrushingInformation[0]?.has_participate_in_toothbrushing
          ? item.toothBrushingInformation[0]?.has_participate_in_toothbrushing
          : "",
      });
      tempPhotoRelease.push({
        value: item.photoRelease[0]?.has_photo_permission_granted
          ? item.photoRelease[0]?.has_photo_permission_granted !== "no"
            ? "✔"
            : "❌"
          : "❌",
        date: item.photoRelease[0]?.has_photo_permission_granted
          ? item.photoRelease[0]?.has_photo_permission_granted
          : "",
      });
      tempDirectoryPermission.push({
        value: item.schoolDirectory[0]?.has_parent_wish_to_add_school_directory
          ? "✔"
          : "❌",
        date: item.schoolDirectory[0]?.has_parent_wish_to_add_school_directory
          ? item.schoolDirectory[0]?.has_parent_wish_to_add_school_directory
          : "",
      });
    });
    tempData.push(
      {
        heading: "Date of Admission",
        row: tempAddmissionDate,
      },
      {
        heading: "  1st Aid/Emergency Medical Consent & Release*",
        row: tempFirstAidEmergencyMedicalRelease,
      },

      {
        heading: "Off site consent",
        row: tempOffSiteConsent,
      },
      {
        heading: "Regular Medications",
        row: tempRegualrMedication,
      },
      {
        heading: "Transportation Plan",
        row: tempTransportAuthority,
      },
      {
        heading: "Authorization And Consent Agreement ",
        row: tempAuthorizationAndConsent,
      },
      {
        heading: "Developmental History",
        row: tempDevelopmental_history,
      },
      {
        heading: "Date of last Physical Exam",
        row: tempLastPhysicalDate,
      },
      {
        heading: "Lead screening",
        row: tempLeadScreening,
      },
      {
        heading: "Immunizations",
        row: tempImmunization,
      },

      {
        heading: "Parent Agreement",
        row: tempParentAgreement,
      },
      {
        heading: "  Local Field/Field trips    ",
        row: tempLocalTripPermission,
      },
      {
        heading: "Sunscreen Permission",
        row: tempSunScreenPermission,
      },
      {
        heading: "  Tooth Brushing ",
        row: tempToothBrushing,
      },
      {
        heading: "  Photograph Permission    ",
        row: tempPhotoRelease,
      },
      {
        heading: "Directory Permission",
        row: tempDirectoryPermission,
      }
    );
    return { tempData, tempHeader };
  };
  formatPrintableTableData = (data) => {
    const printableData = [];
    const tempHeader = [];
    let tempData = [];

    let tempAddmissionDate = [];
    let tempFirstAidEmergencyMedicalRelease = [];
    let tempOffSiteConsent = [];
    let tempTransportAuthority = [];
    let tempRegualrMedication = [];
    let tempAuthorizationAndConsent = [];

    let tempDevelopmental_history = [];
    let tempLastPhysicalDate = [];
    let tempLeadScreening = [];
    let tempImmunization = [];

    let tempParentAgreement = [];
    let tempLocalTripPermission = [];
    let tempSunScreenPermission = [];
    let tempToothBrushing = [];
    let tempPhotoRelease = [];
    let tempDirectoryPermission = [];

    /*
        Print data format
        [
          [{heading:"", row:[]}]
        ]
        */
    // console.log("Checklist Data : : " + JSON.stringify(res.data))
    if (data.length < 7) {
      data.forEach((item) => {
        const row = this.getRowValues(item);
        tempHeader.push(row.tempHeader);
        tempAddmissionDate.push(row.tempAddmissionDate);
        tempFirstAidEmergencyMedicalRelease.push(
          row.tempFirstAidEmergencyMedicalRelease
        );
        tempOffSiteConsent.push(row.tempOffSiteConsent);
        tempTransportAuthority.push(row.tempTransportAuthority);
        tempRegualrMedication.push(row.tempRegualrMedication);
        tempAuthorizationAndConsent.push(row.tempAuthorizationAndConsent);
        tempDevelopmental_history.push(row.tempDevelopmental_history);
        tempLastPhysicalDate.push(row.tempLastPhysicalDate);
        tempLeadScreening.push(row.tempLeadScreening);
        tempImmunization.push(row.tempImmunization);
        tempParentAgreement.push(row.tempParentAgreement);
        tempLocalTripPermission.push(row.tempLocalTripPermission);
        tempSunScreenPermission.push(row.tempSunScreenPermission);
        tempToothBrushing.push(row.tempToothBrushing);
        tempPhotoRelease.push(row.tempPhotoRelease);
        tempDirectoryPermission.push(row.tempDirectoryPermission);
      });
      tempData.push(
        {
          heading: "Date of Admission",
          row: tempAddmissionDate,
        },
        {
          heading: "1st Aid/Emergency Medical Consent & Release*",
          row: tempFirstAidEmergencyMedicalRelease,
        },

        {
          heading: "Off site consent",
          row: tempOffSiteConsent,
        },
        {
          heading: "Regular Medications",
          row: tempRegualrMedication,
        },
        {
          heading: "Transportation Plan",
          row: tempTransportAuthority,
        },
        {
          heading: "Authorization And Consent Agreement ",
          row: tempAuthorizationAndConsent,
        },
        {
          heading: "Developmental History",
          row: tempDevelopmental_history,
        },
        {
          heading: "Date of last Physical Exam",
          row: tempLastPhysicalDate,
        },
        {
          heading: "Lead screening",
          row: tempLeadScreening,
        },
        {
          heading: "Immunizations",
          row: tempImmunization,
        },

        {
          heading: "Parent Agreement",
          row: tempParentAgreement,
        },
        {
          heading: "  Local Field/Field trips    ",
          row: tempLocalTripPermission,
        },
        {
          heading: "Sunscreen Permission",
          row: tempSunScreenPermission,
        },
        {
          heading: "  Tooth Brushing ",
          row: tempToothBrushing,
        },
        {
          heading: "  Photograph Permission    ",
          row: tempPhotoRelease,
        },
        {
          heading: "Directory Permission",
          row: tempDirectoryPermission,
        }
      );
      printableData.push(tempData);
    } else {
      let k = 0;
      data.forEach((item) => {
        const row = this.getRowValues(item);
        if (k < 7) {
          tempHeader.push(row.tempHeader);
          tempAddmissionDate.push(row.tempAddmissionDate);
          tempFirstAidEmergencyMedicalRelease.push(
            row.tempFirstAidEmergencyMedicalRelease
          );
          tempOffSiteConsent.push(row.tempOffSiteConsent);
          tempTransportAuthority.push(row.tempTransportAuthority);
          tempRegualrMedication.push(row.tempRegualrMedication);
          tempAuthorizationAndConsent.push(row.tempAuthorizationAndConsent);
          tempDevelopmental_history.push(row.tempDevelopmental_history);
          tempLastPhysicalDate.push(row.tempLastPhysicalDate);
          tempLeadScreening.push(row.tempLeadScreening);
          tempImmunization.push(row.tempImmunization);
          tempParentAgreement.push(row.tempParentAgreement);
          tempLocalTripPermission.push(row.tempLocalTripPermission);
          tempSunScreenPermission.push(row.tempSunScreenPermission);
          tempToothBrushing.push(row.tempToothBrushing);
          tempPhotoRelease.push(row.tempPhotoRelease);
          tempDirectoryPermission.push(row.tempDirectoryPermission);
          k++;
        } else {
          k = 0;
          tempData.push(
            {
              heading: "Date of Admission",
              row: tempAddmissionDate,
            },
            {
              heading: "1st Aid/Emergency Medical Consent & Release*",
              row: tempFirstAidEmergencyMedicalRelease,
            },

            {
              heading: "Off site consent",
              row: tempOffSiteConsent,
            },
            {
              heading: "Regular Medications",
              row: tempRegualrMedication,
            },
            {
              heading: "Transportation Plan",
              row: tempTransportAuthority,
            },
            {
              heading: "Authorization And Consent Agreement",
              row: tempAuthorizationAndConsent,
            },
            {
              heading: "Developmental History",
              row: tempDevelopmental_history,
            },
            {
              heading: "Date of last Physical Exam",
              row: tempLastPhysicalDate,
            },
            {
              heading: "Lead screening",
              row: tempLeadScreening,
            },
            {
              heading: "Immunizations",
              row: tempImmunization,
            },

            {
              heading: "Parent Agreement",
              row: tempParentAgreement,
            },
            {
              heading: "Local Field/Field trips",
              row: tempLocalTripPermission,
            },
            {
              heading: "Sunscreen Permission",
              row: tempSunScreenPermission,
            },
            {
              heading: "Tooth Brushing",
              row: tempToothBrushing,
            },
            {
              heading: "Photograph Permission",
              row: tempPhotoRelease,
            },
            {
              heading: "Directory Permission",
              row: tempDirectoryPermission,
            }
          );
          printableData.push(tempData);
          tempData = [];
          tempAddmissionDate = [];
          tempFirstAidEmergencyMedicalRelease = [];
          tempOffSiteConsent = [];
          tempTransportAuthority = [];
          tempRegualrMedication = [];
          tempAuthorizationAndConsent = [];

          tempDevelopmental_history = [];
          tempLastPhysicalDate = [];
          tempLeadScreening = [];
          tempImmunization = [];

          tempParentAgreement = [];
          tempLocalTripPermission = [];
          tempSunScreenPermission = [];
          tempToothBrushing = [];
          tempPhotoRelease = [];
          tempDirectoryPermission = [];
        }
      });
    }
    return {
      printableTempData: printableData,
      printableTempHeader: tempHeader,
    };
  };
  getCheckList = (classId) => {
    this.setState({ loading: true });
    getStudentCheckList(classId)
      .then(async (res) => {
        this.setState({ childRecordCheckList: res.data ? res.data : [] });
        // console.log(JSON.stringify(this.state.studentchecklist));
        const { tempHeader, tempData } = await this.formatTableData(res.data);
        const { printableTempHeader, printableTempData } =
          await this.formatPrintableTableData(res.data);
        debugger;
        this.setState({ tableHeader: tempHeader, tableData: tempData });
        this.setState({ printableTempHeader, printableTempData });

        // console.log("THis is table header", JSON.stringify(tempHeader))
        // console.log("THis is table data", JSON.stringify(tempData));
        var tempCSVGenrate = [];
        this.state.tableData.forEach((item) => {
          var tempObj = {};
          item.row.forEach((subItem, subIndex) => {
            tempObj[this.state.tableHeader[subIndex].name] =
              subItem.value === "✔"
                ? subItem.value
                : subItem.value === "❌"
                ? subItem.value
                : subItem.value === ""
                ? subItem.value
                : moment(subItem.value).format("MM/DD/YYYY");
          });
          tempCSVGenrate.push({
            "Child Name and Date of Birth": item.heading,
            ...tempObj,
          });
        });
        this.setState({ csvData: tempCSVGenrate, loading: false });
        //  console.log("THis is  CSV   ", JSON.stringify(tempCSVGenrate))
      })
      .catch((err) => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
          },
          () => {
            if (this.state.apiStatusCode === 401) {
              this.props.customProps._toastMessage(
                "error",
                constants.SESSION_EXPIRED
              );
              this.props._removeToken();
            } else if (this.state.apiStatusCode === 500) {
              this.props.customProps._toastMessage(
                "error",
                constants.SOMETHING_WENT_WRONG
              );
            } else {
              this.props.customProps._toastMessage("error", err.message);
            }
          }
        );
      });
  };
  componentDidMount() {
    if (this.props.loginUserInfo.role_id === 2) {
      // fetching getCheckList   which is used to genrate doc and  download checklist

      //  this.getCheckList();
      this.getClassesList(1);
    }

    //initialize datatable
    try {
      $(document).ready(function () {
        setTimeout(function () {
          $("#checklist").DataTable({
            // pagingType: 'full_numbers',
            pageLength: 100,
            processing: true,
            dom: "Bfrtip",
            // buttons: ["copy", "print"],
            buttons: ["copy"],
          });
        }, 1000);
      });
    } catch (error) {}
  }

  getClassesList = () => {
    let { page_number, page_size } = this.state;
    viewAdminClassList(page_number, page_size)
      .then((res) => {
        // console.log("test KK "+JSON.stringify(res?.data))
        var test = res.data.length ? this.getCheckList(res?.data[0]?.id) : null;
        this.setState({
          allClassesInfo: res.data.length ? res.data : [],
          total_records: res.total_records,
          total_pages: Math.ceil(res.total_records / this.state.page_size),
        });
      })
      .catch((err) => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
          },
          () => {
            if (this.state.apiStatusCode === 401) {
              this.props.customProps._toastMessage(
                "error",
                constants.SESSION_EXPIRED
              );
              this.props._removeToken();
            } else if (this.state.apiStatusCode === 500) {
              this.props.customProps._toastMessage(
                "error",
                constants.SOMETHING_WENT_WRONG
              );
            } else {
              this.props.customProps._toastMessage("error", err.message);
            }
          }
        );
      });
  };

  setLocationFieldAndFetchStudents(event) {
    let { name, value } = event.target,
      { addIncidentModal, allClassesInfo } = this.state;
    if (value) {
      this.getCheckList(value);
      // const targtedClass = allClassesInfo.find(x => x.id === parseInt(value))
      // alert(JSON.stringify(targtedClass))
      // addIncidentModal[name] = parseInt(value);
      // addIncidentModal['location'] = targtedClass ? targtedClass.location : ''
      // this.setState({ addIncidentModal, hasDataLoad: true }, () => {
      //     // this.getAllStudentsList(value);
      //     alert(value)
      // })
    }
  }

  render() {
    const checkmark = "\u2714";
    const cross = "✖️";

    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Little Children School",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const handleClick = () => {
      const csvExporter = new ExportToCsv(options);

      csvExporter.generateCsv(this.state.csvData);
    };
    return (
      <Container
        style={{ overflowY: "hidden" }}
        className="main-layout-height mt-5rem"
      >
        {/* <CookiePolicy/> */}

        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>Sort By Class</label>
                    <select
                      name="class_id"
                      value={this.state.class_id}
                      onChange={(event) =>
                        this.setLocationFieldAndFetchStudents(event)
                      }
                    >
                      <option value="0">Select Class </option>
                      {/* <option value="1"> 1    </option>
                        <option value="2"> 2    </option> */}
                      {this.state.allClassesInfo.length ? (
                        this.state.allClassesInfo.map((data, index) => {
                          return (
                            <option value={data.id} key={index}>
                              {data.class_name}
                            </option>
                          );
                        })
                      ) : (
                        <option value="1">No Class Available</option>
                      )}
                    </select>
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid.Row className="view-child mt-2rem">
          {this.state.loading ? (
            <div className="ui active dimmer">
              <div className="ui indeterminate text loader">
                Preparing Student Check List
              </div>
            </div>
          ) : (
            ""
          )}
          <Grid.Column computer={16} tablet={16} mobile={16}>
            {this.state.tableData.length > 0 ? (
              <>
                <button className="csv-btn" onClick={handleClick}>
                  Download CSV
                </button>
                <button className="csv-btn ml-2">
                  {
                    <ReactToPrint
                      copyStyles={true}
                      trigger={() => <span>Print</span>}
                      content={() => this.printRef.current}
                      pageStyle="@page { size: 2.5in 4in, page-break-before	:auto, page-break-after:auto}"
                    />
                  }
                </button>
              </>
            ) : (
              ""
            )}

            <Table
              className={
                !this?.state?.tableData[0].row.length > 0 ? "centered grid" : ""
              }
              style={{ overflowX: "auto" }}
              id={"checklist"}
              celled
              padded
            >
              <Table.Header>
                <Table.Row>
                  {/* this?.state?.tableData[0].row */}

                  {this?.state?.tableData[0].row.length > 0 ? (
                    <Table.HeaderCell textAlign="center">
                      {" "}
                      Child Name and Date of Birth
                    </Table.HeaderCell>
                  ) : (
                    <Table.HeaderCell textAlign="center">
                      {" "}
                      No Record Found From Database
                    </Table.HeaderCell>
                  )}
                  {this.state.tableHeader.length
                    ? this.state.tableHeader?.map((header, index) => (
                        <Table.HeaderCell textAlign="center" key={index}>
                          {" "}
                          {header.name}{" "}
                          <span style={{ display: "block" }}>{header.dob}</span>
                        </Table.HeaderCell>
                      ))
                    : ""}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.tableData.length
                  ? this.state.tableData?.map((item, mainindex) => (
                      <Table.Row key={mainindex}>
                        <Table.Cell>
                          <Header as="h6" textAlign="center">
                            {item.heading}
                          </Header>
                        </Table.Cell>
                        {item.row.map((subItem, subIndex) => (
                          <Table.Cell
                            textAlign="center"
                            key={subIndex}
                            singleLine
                          >
                            {subItem.value === "✔"
                              ? checkmark
                              : subItem.value === "❌"
                              ? cross
                              : subItem.value.replaceAll("-", "/")}
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    ))
                  : ""}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
        <div className="w-100 hide-print" ref={this.printRef}>
          <h2 className="text-center">LITTLE CHILDREN SCHOOLHOUSE</h2>
          <h3 className="text-center mt-2rem">Child Record CheckList Report</h3>
          <ChildRecords
            childRecordCheckList={this.state.childRecordCheckList}
            header={this.state.printableTempHeader}
            tableData={this.state.printableTempData}
            formatDate={this.formatDate}
            key={0}
          />
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  loginUserInfo: state.loginReducer.loginUserInfo,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildRecordCheckList);
function ChildRecords(props) {
  const { header: tableHeader, tableData } = props;
  const arrayOfTableHeader = [];
  let singleTableHeader = [];
  const arrayOfTableData = [];
  let singleTableData = [];
  let j = 0;
  debugger;

  for (let i = 0; i < tableHeader.length; i++) {
    if (tableHeader.length < 7) {
      arrayOfTableHeader.push(tableHeader);
      break;
    }
    if (j < 7) {
      singleTableHeader.push(tableHeader[i]);
      j++;
    } else {
      j = 0;
      arrayOfTableHeader.push(singleTableHeader);
      singleTableHeader = [];
    }
  }
  // let k=0
  //   for(let i=0; i < tableData.length; i++){
  //     let obj = {heading: tableData[i].heading, row:[]}
  //     let rowArray = [];
  //     for(let a=0; a<tableData[i].row.length; a++){
  //       const row = tableData[i].row[a];
  //       if(row.length < 7){
  //         obj.row.push(tableData[i].row);
  //         break;
  //       }
  //       if(k < 7){
  //         rowArray.push(row);
  //         k++;
  //       }else{
  //         k = 0;
  //         obj.row.push(rowArray);
  //       }
  //     }
  //     arrayOfTableData.push(obj);
  //   }
  debugger;
  return (
    arrayOfTableHeader.length &&
    arrayOfTableHeader.map((childRecord, i) => {
      return (
        <RenderTable
          tableHeader={childRecord}
          tableData={tableData}
          index={i}
        />
      );
    })
  );
}
function RenderTable(props) {
  const { tableHeader, tableData, index = 0 } = props;
  const checkmark = "\u2714";
  const cross = "✖️";
  return (
    <Table
      key={index}
      className={!tableData[0][0].row.length > 0 ? "centered grid" : ""}
      style={{ overflowX: "auto" }}
      id={"checklist"}
      celled
      padded
    >
      <Table.Header>
        <Table.Row>
          {/* this?.state?.tableData[0].row */}

          {tableData[0][0].row.length > 0 ? (
            <Table.HeaderCell textAlign="center">
              {" "}
              Child Name and Date of Birth
            </Table.HeaderCell>
          ) : (
            <Table.HeaderCell textAlign="center">
              {" "}
              No Record Found From Database
            </Table.HeaderCell>
          )}
          {tableHeader.length
            ? tableHeader?.map((headerData, index) => (
                <Table.HeaderCell textAlign="center" key={index}>
                  {" "}
                  {headerData.name}{" "}
                  <span style={{ display: "block" }}>{headerData.dob}</span>
                </Table.HeaderCell>
              ))
            : ""}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.length
          ? tableData?.map((itemArray) =>
              itemArray.map((item, mainindex) => (
                <Table.Row key={mainindex}>
                  <Table.Cell>
                    <Header as="h6" textAlign="center">
                      {item.heading}
                    </Header>
                  </Table.Cell>
                  {item.row.map((subItem, subIndex) => (
                    <Table.Cell
                      textAlign="center"
                      key={subIndex}
                      singleLine
                      className="wordWrap"
                    >
                      {subItem.value === "✔"
                        ? checkmark
                        : subItem.value === "❌"
                        ? cross
                        : subItem.value.replaceAll("-", "/")}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )
          : ""}
      </Table.Body>
    </Table>
  );
}
