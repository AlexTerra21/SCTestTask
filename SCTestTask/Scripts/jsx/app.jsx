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
           this.state = { employees: [], count: 0, sortColumn:'None', sortDirection:'None'};
    
            this.onAddEmployee = this.onAddEmployee.bind(this);
            this.onRemoveEmployee = this.onRemoveEmployee.bind(this);
            this.onSetSortParams = this.onSetSortParams.bind(this);
       }
       // загрузка данных
       ajaxLoadData() {
            console.log('ajaxLoadData');
            var data = { 'aColumn': this.state.sortColumn,
                         'aDirection': this.state.sortDirection};
            console.log(data.aColumn+data.aDirection);
            $.ajax({
                url:  this.props.getUrl,
                type: 'POST',
                dataType: 'json',
                data: data,
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


       onSetSortParams (column, direction) {
           console.log(column + direction);
           this.setState({sortColumn: column}, function () {
			   this.setState({sortDirection: direction}, function () {
					console.log(this.state.sortColumn+this.state.sortDirection);
					this.ajaxLoadData();
			   });
		   });
        //   this.setState({sortDirection: direction});
        //   console.log(this.state.sortColumn+this.state.sortDirection);
        //   sleep(2000);
           
        // var data = { 'aColumn': column,
        //              'aDirection': direction};
        // $.ajax({
        //     url:  this.props.sortUrl,
        //     type: 'POST',
        //     dataType: 'json',
        //     data: data,
        //     success: function (data) {
        //         console.log('success');
        //         this.ajaxLoadData();
        //     }.bind(this),
        //     error: function (xhr, status, err) {
        //         console.error(this.props.sortUrl, status, err.toString());
        //     }.bind(this)
        // });
       }

       onAddEmployee  () {
        //window.open('http://google.com');
		document.location.href = "/home/add?id=0";
       }

       onEditEmployee  (employee)  {
        document.location.href = "/home/edit?id="+employee.Id;
       }

       // удаление объекта
       onRemoveEmployee  (employee)  { 
            if (!confirm("Delete employee " + employee.Name + "?")) return;
            var data_id = { 'id': employee.Id };
            console.log('id = ' + employee.Id);
            $.ajax({
                url:  this.props.deleteUrl,
                type: 'POST',
                dataType: 'json',
                data: data_id,
                success: function (data) {
                    this.ajaxLoadData();
                    this.ajaxGetCount();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.deleteUrl, status, err.toString());
                }.bind(this)
            });
       }

       onLogout () {
        $.ajax({
            url:  this.props.logoutUrl,
            dataType: 'json',
            success: function (data) {
                document.location.href = "/home";
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.logoutUrl, status, err.toString());
            }.bind(this)
        });
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
                                <input type="button" title="Ascending" value='▲' onClick={this.onSetSortParams.bind(null,'Name','Ascending')}/>
                                <input type="button" title="Descending" value='▼' onClick={this.onSetSortParams.bind(null,'Name','Descending')}/>
                            </center>
                        </td>
                        <td>
                            <center>
                                <b>Birthday</b>
                                <input type="button" title="Ascending" value='▲' onClick={this.onSetSortParams.bind(null,'Birthday','Ascending')}/>
                                <input type="button" title="Descending" value='▼' onClick={this.onSetSortParams.bind(null,'Birthday','Descending')}/>
                            </center>
                        </td>
                        <td>
                            <center>
                                <b>Email</b>
                                <input type="button" title="Ascending" value='▲' onClick={this.onSetSortParams.bind(null,'Email','Ascending')}/>
                                <input type="button" title="Descending" value='▼' onClick={this.onSetSortParams.bind(null,'Email','Descending')}/>
                            </center>
                        </td>
                        <td>
                            <center>
                                <b>Salary</b>
                                <input type="button" title="Ascending" value='▲' onClick={this.onSetSortParams.bind(null,'Salary','Ascending')}/>
                                <input type="button" title="Descending" value='▼' onClick={this.onSetSortParams.bind(null,'Salary','Descending')}/>
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
                <p>Количество сотрудников {this.state.count}</p><br/>
                <button title="Logout" onClick={this.onLogout.bind(this)}>Logout</button>
                </div>
        </div>;
       }
   }


ReactDOM.render( 
    <EmployeesList getUrl="/home/getemployees" postUrl="/home/addemploee" deleteUrl="/home/deleteemployee" countUrl="/home/getcountelement" 
                   logoutUrl="/account/logoff" sortUrl="/home/setsortparametrs"/>,
    document.getElementById("content")
  );

