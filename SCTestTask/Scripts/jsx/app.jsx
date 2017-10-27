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

class PageButton extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {i: this.props.i}
    }

    goToPage (i) {
        this.props.goToPage(i);
    }

    render () {
        return <button onClick={this.goToPage.bind(this,this.state.i)}> {this.state.i} </button>
    }
}

class EmployeesList extends React.Component{
    
       constructor(props){
           super(props);
           this.state = { employees: [], count: 0, 
                          sortColumn:'None', sortDirection:'None',
                          currentPage : 1, totalPage: 0
                        };
    
            this.onAddEmployee = this.onAddEmployee.bind(this);
            this.onRemoveEmployee = this.onRemoveEmployee.bind(this);
            this.onSetSortParams = this.onSetSortParams.bind(this);
            this.getPageCount = this.getPageCount.bind(this);
            this.goToPage = this.goToPage.bind(this);
       }

    componentDidMount() {
        this.initialize();
    }

       // загрузка данных
       LoadData() {
            console.log('ajaxLoadData');
            var data = { 'aColumn': this.state.sortColumn,
                         'aDirection': this.state.sortDirection,
                         'aCurrentPage' : this.state.currentPage,
                         'aTotalPage' : this.state.totalPage
                       };
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

       initialize() {
        
        $.ajax({
            url:  this.props.countUrl,
            dataType: 'json',
            success: function (data) {
                this.setState({ count: data }, function () {
                    this.setState({totalPage: this.getPageCount()}, function () {
                        this.LoadData();
                    });
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.countUrl, status, err.toString());
            }.bind(this)
        });
       }


       onSetSortParams (column, direction) {
           console.log(column + direction);
           this.setState({sortColumn: column}, function () {
			   this.setState({sortDirection: direction}, function () {
					console.log(this.state.sortColumn+this.state.sortDirection);
					this.LoadData();
			   });
		   });
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
                    this.initialize();
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

       getPageCount() {
           var employeeCount = this.state.count;
           console.log('employeeCount = ' + employeeCount);
           return Math.ceil(employeeCount  / 10 ) ;
       }

    //    getEmployeeCount () {
           
    //     if (this.state.count)
    //         return this.state.count;
    //     else 
    //         return 0;
    //    }

       goToPage (i) {
           //alert('Page #' + i);
           this.setState({currentPage: i}, function () {
               this.LoadData();
           });
       }
       

       render(){
        var remove = this.onRemoveEmployee;
        var edit = this.onEditEmployee; 
        var pageCount = this.getPageCount;
        var goToPage = this.goToPage;
        var pageButtons = [];
        for (var i = 0; i < this.getPageCount(); i++ ) pageButtons.push(i+1);
        console.log(pageButtons);
        console.log('EmployeesList this.state.count  = ' + this.state.count);
        return <div>
                <h2>Employees list</h2>
                <button title="Add" onClick={this.onAddEmployee}><img src="Images/add.png" width="12px"/> Add</button>
                <hr/>
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
                <hr/>
                <div>Количество сотрудников <b>{this.state.count}</b></div>
                <div>Страница <b>{this.state.currentPage}</b> из <b>{this.state.totalPage}</b></div>
                <div>
                {
                    pageButtons.map(function (i) {
                       return <PageButton key={i} i={i} goToPage={goToPage}/>
                    })
                }
                </div>
                
                <br/>
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

