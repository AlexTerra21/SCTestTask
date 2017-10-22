class EditForm extends React.Component{

    render () {
        var $_GET = {}; 
        var __GET = window.location.search.substring(1).split("&"); 
        console.log(__GET);
        for(var i=0; i<__GET.length; i++) { 
            var getVar = __GET[i].split("="); 
            $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
        } 
        console.log($_GET);
        return <div>
            Edit existing employee ID={$_GET['id']}
            
        </div>
    }
}

ReactDOM.render(
    <EditForm />,
    document.getElementById("content")
  );