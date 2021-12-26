// import React, { Component } from "react";
// import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import StudentTableRow from './StudentTableRow';

// export default class StudentList extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       students: []
//     };
//   }

//   componentDidMount() {
//     axios.get('http://localhost:4000/read/')
//       .then(res => {
//         this.setState({
//           students: res.data
//         });
//         console.log(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }

//   DataTable() {
//     return this.state.students.map((res, i) => {
//       return <StudentTableRow obj={res} key={i} />;
//     });
//   }

//   render() {
//     return (<div className="table-wrapper">
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Fname</th>
//             <th>Lname</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {this.DataTable()}
//         </tbody>
//       </Table>
      
//     </div>);
//   }
// }





import React,{Component} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';



export default class StudentTableRow extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
    students: []
  };
  // constructor(props) {
  //       super(props)
  //       this.state = {
  //         students: []
  //       };
  //     }
    
      componentDidMount() {
        axios.get('http://localhost:4000/read/')
          .then(res => {
            this.setState({
              students: res.data
            });
            console.log("_______",this.state.students);
          })
          .catch((error) => {
            console.log(error);
          })
      }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  
  handleDelt = (record) =>{
    console.log('_____',record.Fname);
    axios.delete('http://localhost:4000/delete-student/' + record._id)
    .then((res) => {
        console.log('Student successfully deleted!')
    }).catch((error) => {
        console.log(error)
    })
  }

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'First name',
        dataIndex: 'Fname',
        key: 'Fname',
        width: '30%',
        ...this.getColumnSearchProps('Fname'),
      },
      {
        title: 'Last name',
        dataIndex: 'Lname',
        key: 'Lname',
        width: '20%',
        ...this.getColumnSearchProps('Lname'),
      },
      {
        title: 'Phone',
        dataIndex: 'Phone',
        key: 'Phone',
        width: '20%',
        ...this.getColumnSearchProps('Phone'),
      },
      {
        title: 'Address',
        dataIndex: 'Address',
        key: 'Address',
        ...this.getColumnSearchProps('Address'),
        sorter: (a, b) => a.Address.length - b.Address.length,
        sortDirections: ['descend', 'ascend'],
      },
     {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
         <Link className="edit-link" to={"/edit-student/" + record._id}>
                        Edit
                    </Link>
       <Button onClick={() => this.handleDelt(record)} >Delete</Button>
      </Space>
    ),
  },
    ];
    return <Table columns={columns} dataSource={this.state.students} pagination='2' />;
  }
}
