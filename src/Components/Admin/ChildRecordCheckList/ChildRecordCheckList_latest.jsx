import React, { Component } from "react";
import { Container, Grid, Form, Pagination, Dropdown } from "semantic-ui-react";
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
      childRecordCheckList: [],
      recordView: constants.SORT_RECORD,
      siblingRange: 1,
      page_number: 1,
      page_size: 20,
      total_records: 0,
      boundaryRange: 0,
      showFirstAndLastNav: true,
      showPreviousAndNextNav: true,
      showEllipsis: true,
      total_pages: "",
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
  getCheckList = (classId) => {
    this.setState({ loading: true });
    getStudentCheckList(classId)
      .then((res) => {
        // console.log(JSON.stringify(this.state.studentchecklist));
        this.setState({ childRecordCheckList: res.data ? res.data : [] });
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
        res.data.forEach((item) => {
          tempHeader.push({
            name: `${item.first_name} ${item.last_name}`,
            dob: this.formatDate(item.birth_date),
          });
          // alert(  item.healthReport[0]?.regular_medications  )

          tempAddmissionDate.push({
            value: item.admission_date
              ? this.formatDate(item.admission_date)
              : "❌",
            date: item.admission_date
              ? this.formatDate(item.admission_date)
              : "",
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
            date: item.toothBrushingInformation[0]
              ?.has_participate_in_toothbrushing
              ? item.toothBrushingInformation[0]
                  ?.has_participate_in_toothbrushing
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
            value: item.schoolDirectory[0]
              ?.has_parent_wish_to_add_school_directory
              ? "✔"
              : "❌",
            date: item.schoolDirectory[0]
              ?.has_parent_wish_to_add_school_directory
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
        this.setState({ tableHeader: tempHeader, tableData: tempData });

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
            buttons: ["copy", "print"],
          });
        }, 1000);
      });
    } catch (error) {}
  }
  // onchange of page show activve page number in pagination
  handlePaginationChange = (e, { activePage }) => {
    this.setState(
      {
        page_number: activePage,
        hasDataLoad: true,
      },
      () => {
        // Get child data
      }
    );
  };
  getClassesList = () => {
    let { page_number, page_size } = this.state;
    viewAdminClassList(page_number, page_size)
      .then((res) => {
        // console.log("test KK "+JSON.stringify(res?.data))
        // var test = res.data.length ? this.getCheckList(res?.data[0]?.id) : null;
        this.setState({
          allClassesInfo: res.data.length ? res.data : [],
          // total_records: res.total_records,
          // total_pages: Math.ceil(res.total_records / this.state.page_size),
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

        <div>
          <SortHeading />
          {/* <div className="tableHeadingDetail">
            <div className="tableHeadingDetailSingle">
              <span>DOA</span>
              <span>Date of Admission</span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>EMC & R*</span>
              <span>1st Aid/Emergency Medical Consent & Release*</span>
            </div>

            <div className="tableHeadingDetailSingle">
              <span>OSC</span>
              <span>Off site consent</span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>RM</span>
              <span>Regular Medications</span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>TP</span>
              <span>Transportation Plan</span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>Auth & CA</span>
              <span>Authorization And Consent Agreement </span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>DH</span>
              <span>Developmental History</span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>DOLPE</span>
              <span>Date of last Physical Exam</span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>LC</span>
              <span>Lead screening</span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>Immun</span>
              <span>Immunizations</span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>PA</span>
              <span>Parent Agreement</span>
            </div>

            <div className="tableHeadingDetailSingle">
              <span>LF/FT </span>
              <span>Local Field/Field trips </span>
            </div>

            <div className="tableHeadingDetailSingle">
              <span>SP</span>
              <span>Sunscreen Permission</span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>TB</span>
              <span>Tooth Brushing </span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>PP</span>
              <span>Photograph Permission </span>
            </div>
            <div className="tableHeadingDetailSingle">
              <span>DP</span>
              <span>Directory Permission</span>
            </div>
          </div> */}
          <Form>
            <Form.Group widths="equal">
              <Form.Field className="customSelect">
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
        </div>
        <div className="view-child mt-2rem">
          {this.state.loading ? (
            <div class="ui active dimmer">
              <div class="ui indeterminate text loader">
                Preparing Student Check List
              </div>
            </div>
          ) : (
            ""
          )}
          <div>
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
            <ChildRecords
              childRecordCheckList={this.state.childRecordCheckList}
              formatDate={this.formatDate}
            />
            {/* <table class=" celled padded table text-center">
              <thead>
                <tr>
                  <th scope="col">CN & DOB</th>
                  <th scope="col">EMC & R*</th>
                  <th scope="col">LF/FT</th>
                  <th scope="col">PP</th>
                  <th scope="col">TB</th>
                  <th scope="col">Auth & CA</th>
                  <th scope="col">DOA</th>
                  <th scope="col">DOLPE</th>
                  <th scope="col">DH</th>
                  <th scope="col">DP</th>
                  <th scope="col">Immun.</th>
                  <th scope="col">LC</th>
                  <th scope="col">OSC</th>
                  <th scope="col">PA</th>
                  <th scope="col">RM</th>
                  <th scope="col">SP</th>
                  <th scope="col">TP</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.childRecordCheckList.length ? 
                    this.state.childRecordCheckList.map((child,index) => (
                      <tr key={index}>
                        <th>
                          {`${child.first_name} ${child.last_name}`}  
                          <span className="d-block">{this.formatDate(child.birth_date)}</span>
                        </th>
                        <td>{child.emergencyInfo[0]?.has_emergency_release ? "✔" : "❌"}</td>
                        <td>{child.localTripPermission[0]?.has_parent_agreed_for_trip ? "✔" : "❌"}</td>
                        <td>{child.photoRelease[0]?.has_photo_permission_granted !== "no" ? "✔" : "❌"}</td>
                        <td>{child.toothBrushingInformation[0]?.has_participate_in_toothbrushing !== "no" ? "✔" : "❌"}</td>
                        <td>{child.authorizationAndConsent[0]?.has_authorize_and_consent_agreement ? "✔" : "❌"}</td>
                        <td>{child.admission_date ? this.formatDate(child.admission_date) : "❌"}</td>
                        <td>{child.medicalInfo[0]?.last_physical_date ? this.formatDate(child.medicalInfo[0]?.last_physical_date) : ""}</td>
                        <td>{child.devReport[0] ? "✔" : "❌"}</td>
                        <td>{child.schoolDirectory[0]?.has_parent_wish_to_add_school_directory ? "✔": "❌"}</td>
                        <td>{child.medicalInfo[0]?.immunizations ? "✔" : "❌"}</td>
                        <td>{child.medicalInfo[0]?.lead_screen_date? this.formatDate(child.medicalInfo[0]?.lead_screen_date) : ""}</td>
                        <td>{child.authorizationAndConsent[0]?.has_authorize_and_consent_agreement ? "✔" : "❌"}</td>
                        <td>{child.parentAgreement[0]?.has_parent_agreed_with_policies ? "✔" : "❌"}</td>
                        <td>{child.healthReport[0]?.regular_medications ? child.healthReport[0]?.regular_medications : "❌"}</td>
                        <td>{child.sunscreenPermission[0]?.has_sunscreen_provided_by_school ? "✔" : "❌"}</td>
                        <td>{child.transportAuthority[0]?.has_program_bus_van ? "✔" : "❌"}</td>
                      </tr>
                    )) 
                  : <tr><td colspan="17">No Data Found</td></tr>
                }
              </tbody>
              <tfoot>
              {/* {total_records >= 20 ? (
                <Grid>
                  <Grid.Row className="mt-2rem">
                    <Grid.Column computer={6} mobile={16}>
                      <label className="mr-5">Show Record:</label>
                      <Dropdown
                        // defaultValue={recordView[0].value}
                        compact
                        selection
                        options={recordView}
                        value={page_size}
                        onChange={(event, { value }) =>
                          this.handleRecordDropdown(event, value)
                        }
                      ></Dropdown>
                      <label className="ml-5">Record per page</label>
                    </Grid.Column>
                    <Grid.Column computer={4} mobile={16} />
                    <Grid.Column computer={6} mobile={16}>
                      <Pagination
                        // defaultActivePage={page_number}
                        activePage={page_number}
                        siblingRange={siblingRange}
                        firstItem={showFirstAndLastNav ? undefined : null}
                        lastItem={showFirstAndLastNav ? undefined : null}
                        pointing
                        secondary
                        totalPages={total_pages}
                        boundaryRange={boundaryRange}
                        ellipsisItem={showEllipsis ? undefined : null}
                        prevItem={showPreviousAndNextNav ? undefined : null}
                        nextItem={showPreviousAndNextNav ? undefined : null}
                        onPageChange={this.handlePaginationChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ) : (
                ""
              )} */}
            {/* <tr>
                  <th colspan="18">
                    <div class="ui right floated pagination menu">
                      <a class="icon item">
                        <i class="left chevron icon"></i>
                      </a>
                      <a class="item">1</a>
                      <a class="item">2</a>
                      <a class="item">3</a>
                      <a class="item">4</a>
                      <a class="icon item">
                        <i class="right chevron icon"></i>
                      </a>
                    </div>
                  </th>
                </tr> 
              </tfoot>
            </table> */}
          </div>
        </div>
        <div className="w-100 hide-print" ref={this.printRef}>
          <h2 className="text-center">LITTLE CHILDREN SCHOOLHOUSE</h2>
          <h3 className="text-center mt-2rem">Child Record CheckList Report</h3>
          <SortHeading />
          <ChildRecords
            childRecordCheckList={this.state.childRecordCheckList}
            formatDate={this.formatDate}
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
function SortHeading() {
  return (
    <div className="tableHeadingDetail">
      <div className="tableHeadingDetailSingle">
        <span>DOA</span>
        <span>Date of Admission</span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>EMC & R*</span>
        <span>1st Aid/Emergency Medical Consent & Release*</span>
      </div>

      <div className="tableHeadingDetailSingle">
        <span>OSC</span>
        <span>Off site consent</span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>RM</span>
        <span>Regular Medications</span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>TP</span>
        <span>Transportation Plan</span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>Auth & CA</span>
        <span>Authorization And Consent Agreement </span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>DH</span>
        <span>Developmental History</span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>DOLPE</span>
        <span>Date of last Physical Exam</span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>LC</span>
        <span>Lead screening</span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>Immun</span>
        <span>Immunizations</span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>PA</span>
        <span>Parent Agreement</span>
      </div>

      <div className="tableHeadingDetailSingle">
        <span>LF/FT </span>
        <span>Local Field/Field trips </span>
      </div>

      <div className="tableHeadingDetailSingle">
        <span>SP</span>
        <span>Sunscreen Permission</span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>TB</span>
        <span>Tooth Brushing </span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>PP</span>
        <span>Photograph Permission </span>
      </div>
      <div className="tableHeadingDetailSingle">
        <span>DP</span>
        <span>Directory Permission</span>
      </div>
    </div>
  );
}
function ChildRecords(props) {
  const childRecordCheckList = props.childRecordCheckList;
  return (
    <div className="childTableMain">
      <table class=" celled padded table text-center">
        <thead>
          <tr>
            <th scope="col">CN & DOB</th>
            <th scope="col">EMC & R*</th>
            <th scope="col">LF/FT</th>
            <th scope="col">PP</th>
            <th scope="col">TB</th>
            <th scope="col">Auth & CA</th>
            <th scope="col">DOA</th>
            <th scope="col">DOLPE</th>
            <th scope="col">DH</th>
            <th scope="col">DP</th>
            <th scope="col">Immun.</th>
            <th scope="col">LC</th>
            <th scope="col">OSC</th>
            <th scope="col">PA</th>
            <th scope="col">RM</th>
            <th scope="col">SP</th>
            <th scope="col">TP</th>
          </tr>
        </thead>
        <tbody>
          {childRecordCheckList.length ? (
            childRecordCheckList.map((child, index) => (
              <tr key={index}>
                <th>
                  {`${child.first_name} ${child.last_name}`}
                  <span className="d-block">
                    {props.formatDate(child.birth_date)}
                  </span>
                </th>
                <td>
                  {child.emergencyInfo[0]?.has_emergency_release ? "✔" : "❌"}
                </td>
                <td>
                  {child.localTripPermission[0]?.has_parent_agreed_for_trip
                    ? "✔"
                    : "❌"}
                </td>
                <td>
                  {child.photoRelease[0]?.has_photo_permission_granted !== "no"
                    ? "✔"
                    : "❌"}
                </td>
                <td>
                  {child.toothBrushingInformation[0]
                    ?.has_participate_in_toothbrushing !== "no"
                    ? "✔"
                    : "❌"}
                </td>
                <td>
                  {child.authorizationAndConsent[0]
                    ?.has_authorize_and_consent_agreement
                    ? "✔"
                    : "❌"}
                </td>
                <td>
                  {child.admission_date
                    ? props.formatDate(child.admission_date)
                    : "❌"}
                </td>
                <td>
                  {child.medicalInfo[0]?.last_physical_date
                    ? props.formatDate(child.medicalInfo[0]?.last_physical_date)
                    : ""}
                </td>
                <td>{child.devReport[0] ? "✔" : "❌"}</td>
                <td>
                  {child.schoolDirectory[0]
                    ?.has_parent_wish_to_add_school_directory
                    ? "✔"
                    : "❌"}
                </td>
                <td>{child.medicalInfo[0]?.immunizations ? "✔" : "❌"}</td>
                <td>
                  {child.medicalInfo[0]?.lead_screen_date
                    ? props.formatDate(child.medicalInfo[0]?.lead_screen_date)
                    : ""}
                </td>
                <td>
                  {child.authorizationAndConsent[0]
                    ?.has_authorize_and_consent_agreement
                    ? "✔"
                    : "❌"}
                </td>
                <td>
                  {child.parentAgreement[0]?.has_parent_agreed_with_policies
                    ? "✔"
                    : "❌"}
                </td>
                <td>
                  {child.healthReport[0]?.regular_medications
                    ? child.healthReport[0]?.regular_medications
                    : "❌"}
                </td>
                <td>
                  {child.sunscreenPermission[0]
                    ?.has_sunscreen_provided_by_school
                    ? "✔"
                    : "❌"}
                </td>
                <td>
                  {child.transportAuthority[0]?.has_program_bus_van
                    ? "✔"
                    : "❌"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colspan="17">No Data Found</td>
            </tr>
          )}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
// data formate for table Headers   tableHeader: [
//   { name: "mark", dob: "20 Nov" },
//   { name: "mark", dob: "20 Nov" },
//   { name: "mark", dob: "20 Nov" },
//   { name: "mark", dob: "20 Nov" },
//   { name: "mark", dob: "20 Nov" }
// ],
// data formate for UI genration
// tableData: [
//   {
//     heading: "immunizations",
//     row: [{ value: "true", date: "27 Nov" }, { value: "true", date: "28 Nov" }, { value: "true", date: "29 Nov" }],
//   },
//   {
//     heading: "last_physical_date",
//     row: [{ value: "true", date: "27 Nov" }, { value: "true", date: "28 Nov" }, { value: "true", date: "29 Nov" }],
//   }
// ],
// data formate for CSV download
// csvData :[
//   {
//     "Child Name and Date of Birth":'Local Field/Field trips',
//     "Danish ALi 04 03 1997": "✔",
//     "ALi 03 02 1997": "✖️",
//     "Test Khan 02 04 2000": "✔"
//   },
//   {
//     "Child Name and Date of Birth":'Photograph Permission',
//     "Danish ALi 04 03 1997": "✔",
//     "ALi 03 02 1997": "✖️",
//     "Test Khan 02 04 2000": "✔"
//   },
// ]
