// Компонент для отображения строки таблицы
class Employee extends React.Component{
    constructor(props){
        super(props);
        this.state = {data: props.employee}; // Данные о сотруднике
        // Привязка методов для предотвращения потери контекста
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }
    // Нажатие удаления
    onRemoveClick(e){
        this.props.onRemove(this.state.data);
    }
    // Нажатие редактирования
    onEditClick(e){
        this.props.onEdit(this.state.data)
    }

    render(){
        // Преобразование даты из формата JSON /Date(00000000...0000)/ в тип Date
		var pattern = /Date\(([^)]+)\)/;  // Паттерн для разбивки строки
		var results = pattern.exec(this.state.data.Birthday); // Строка преобразовывается в массив
        var date = new Date(parseFloat(results[1])); // Искомое значение времени находится во 2-й ячейке массива
        // Перед выводом даты переобразуем ее в формат зависящий от текущей локали.
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
// Компонент для отображения кнопки переключения страницы
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
// Главный компонент приложения
class EmployeesList extends React.Component{
    constructor(props){
        super(props);
        this.state = { employees: [],       // Список отображаемых сотрудников
                       count: 0,            // Количество сотрудников в базе
                       sortColumn:'None',   // Колонка по которой производится сортировка
                       sortDirection:'None',// Направление сортировка
                       currentPage : 1,     // Номер отображаемой страницы
                       totalPage: 0         // Общее количество страниц
                    };
        // Привязка методов для предотвращения потери контекста
        this.onAddEmployee = this.onAddEmployee.bind(this);
        this.onRemoveEmployee = this.onRemoveEmployee.bind(this);
        this.onSetSortParams = this.onSetSortParams.bind(this);
        this.getPageCount = this.getPageCount.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }
    // Инициализация компонента
    componentDidMount() {
        this.onInit();
    }
    // Загрузка данных
    LoadData() {
        var data = { 'aColumn': this.state.sortColumn,        // Колонка для сортировки 
                     'aDirection': this.state.sortDirection,  // Направление сортировки
                     'aCurrentPage' : this.state.currentPage  // № страницы выводимых данных
                    };
        $.ajax({
            url:  this.props.getUrl,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                this.setState({ employees: data });        // Сохранение полученных данных в массив
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.getUrl, status, err.toString());
            }.bind(this)
        });
    }
    // Инициализация компонента 
    onInit() {
    $.ajax({
        url:  this.props.countUrl,
        dataType: 'json',
        success: function (data) {
            this.setState({ count: data }, function () { // Получение количаства сотрудников ... 
                this.setState({totalPage: this.getPageCount()}, function () {  // ... затем расчет количества страниц ...  
                    this.LoadData();                       // ... затем загрузка данных
                });
            });
        }.bind(this),
        error: function (xhr, status, err) {
            console.error(this.props.countUrl, status, err.toString());
        }.bind(this)
    });
    }
    // Установка новых параметров сортировки
    onSetSortParams (column, direction) {
        this.setState({sortColumn: column}, function () { // Установка колоки сортировки ... 
            this.setState({sortDirection: direction}, function () { // ... затем направления сортировки ... 
                this.LoadData();    // ... затем обновление данных
            });
        });
    }
    // Добавление сотрудника
    onAddEmployee  () {
    document.location.href = "/home/add?id=0"; // Переход на станицу добавления сотрудника
    }
    // Редактирование сотрудника
    onEditEmployee  (employee)  {
    document.location.href = "/home/edit?id="+employee.Id; // Переход на страницу редактироания сотрудника
    }

    // Удаление сотрудника
    onRemoveEmployee  (employee)  { 
        if (!confirm("Delete employee " + employee.Name + "?")) return;  // Запрос подтверждения
        var data_id = { 'id': employee.Id };   // Id удляемого сотрудника
        $.ajax({
            url:  this.props.deleteUrl,
            type: 'POST',
            dataType: 'json',
            data: data_id,
            success: function (data) {
                this.onInit();   // После удаления необходимо обновить данные таблицы
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.deleteUrl, status, err.toString());
            }.bind(this)
        });
    }
    // Выход из системы
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
    // Расчет количества страниц
    getPageCount() {
        return Math.ceil( this.state.count  / 10 ) ;
    }
    // Переход к указанной странице
    goToPage (i) {
        this.setState({currentPage: i}, function () { // Установка номера страницы ... 
            this.LoadData();   // ... затем обновление данных таблицы
        });
    }

    render(){
        // Переменные для передачи методов в компоненты
        var remove = this.onRemoveEmployee;
        var edit = this.onEditEmployee; 
        var pageCount = this.getPageCount;
        var goToPage = this.goToPage;
        // Инициализация массива для размещения кнопок-переходов страниц
        var pageButtons = [];
        for (var i = 0; i < this.getPageCount(); i++ ) pageButtons.push(i+1);
        if (this.state.employees.length == 0) // Проверка на наличие данных
            return <p>Loading data...</p>; // Ожидание
        else
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
    <EmployeesList getUrl="/home/getemployees" postUrl="/home/addemploee" deleteUrl="/home/deleteemployee" 
                   countUrl="/home/getcountelement" logoutUrl="/account/logoff" sortUrl="/home/setsortparametrs"/>,
    document.getElementById("content")
);

