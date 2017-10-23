class Employee extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {data: props.employee};
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        
    }
    onRemoveClick(e){
        this.props.onRemove(this.state.data);
    }
    onEditClick(e){
        this.props.onEdit(this.state.data)
    }
    render(){
		var pattern = /Date\(([^)]+)\)/;
		var results = pattern.exec(this.state.data.Birthday);
		//console.log(results);
		var date = new Date(parseFloat(results[1]));
		//console.log(date);

        return <tr>
					<td>{this.state.data.Name}</td>
					<td><center>{date.toLocaleDateString()}</center></td>
					<td>{this.state.data.Email}</td>
					<td>{this.state.data.Salary}</td>
					<td><button title="Edit" onClick={this.onEditClick}><img src="Images/edit.png" width="11px"/> Edit</button></td>
					<td><button title="Remove" onClick={this.onRemoveClick}><img src="Images/delete.png" width="11px"/> Remove</button></td>
                </tr>
    }
}

class EmployeesList extends React.Component{
    
       constructor(props){
           super(props);
           this.state = { employees: [], count: 0};
    
            this.onAddEmployee = this.onAddEmployee.bind(this);
            this.onRemoveEmployee = this.onRemoveEmployee.bind(this);
       }
       // загрузка данных
       ajaxLoadData() {
            $.ajax({
                url:  this.props.getUrl,
                dataType: 'json',
                success: function (data) {
                    this.setState({ employees: data });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.getUrl, status, err.toString());
                }.bind(this)
            });
       }

       ajaxGetCount() {
        $.ajax({
            url:  this.props.countUrl,
            dataType: 'json',
            success: function (data) {
                this.setState({ count: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.countUrl, status, err.toString());
            }.bind(this)
        });
       }

       componentDidMount() {
           this.ajaxLoadData();
           this.ajaxGetCount();
       }

       onAddEmployee () {
        //window.open('http://google.com');
		document.location.href = "/home/add?id=0";
       }

       onEditEmployee (employee) {
        document.location.href = "/home/edit?id="+employee.Id;
       }

       // удаление объекта
       onRemoveEmployee(employee) {
		alert("Employee " + employee.Name + " deleted");
       }
       render(){
        var remove = this.onRemoveEmployee;
        var edit = this.onEditEmployee; 
        return <div>
                <h2>Employees list</h2>
                <button title="Add" onClick={this.onAddEmployee}><img src="Images/add.png" width="12px"/> Add</button>
                <div>
                <table>
                    <thead>
                    <tr>
                        <td>
                            <center>
                                <b>Name</b>
                                <button title="Sort Up">▲</button>
                                <button title="Sort Down">▼</button>
                            </center>
                        </td>
                        <td>
                            <center>
                                <b>Birthday</b>
                                <button title="Sort Up">▲</button>
                                <button title="Sort Down">▼</button>
                            </center>
                        </td>
                        <td>
                            <center>
                                <b>Email</b>
                                <button title="Sort Up">▲</button>
                                <button title="Sort Down">▼</button>
                            </center>
                        </td>
                        <td>
                            <center>
                                <b>Salary</b>
                                <button title="Sort Up">▲</button>
                                <button title="Sort Down">▼</button>
                            </center>
                        </td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(function(employee){
                                return <Employee key={employee.Id} employee={employee} onRemove={remove} onEdit={edit} />
                            })
                        }
                    </tbody>
                </table>
                <p>Количество сотрудников {this.state.count}</p>
                </div>
        </div>;
       }
   }


ReactDOM.render(
    <EmployeesList getUrl="/home/getemployees" postUrl="/home/addemploee" deleteUrl="/home/deleteemployee" countUrl="/home/getcountelement" />,
    document.getElementById("content")
  );

