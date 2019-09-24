var resname;

function noenter() 
{
  return !(window.event && window.event.keyCode == 13);
}

function handleChange(input) 
{
	if (input.value <= 0) input.value = 1;
	if (input.value > 100) input.value = 100;
}

function ClosePanel()
{
	var obj = { message: 'closing panel' };
	$.post('http://'+resname+'/ClosePanel', JSON.stringify(obj));
}

function RefreshPanel()
{
	var obj = { message: 'refreshing panel' };
	$.post('http://'+resname+'/RefreshPanel', JSON.stringify(obj));
}

function BackPanel()
{
	$('#edit').hide();
	$('#panel').show();
	return;
}

function Change(license)
{
	var obj = { License: license }
	var buf = $('#edit');
	$('#panel').hide();
	document.getElementById("options").innerHTML = "";
	buf.find('table').append("<tr class=\"heading\"><th>Reserved Slot Setting</th><th>Priority Setting</th><th>Kick or Ban</th></tr><tr><td><button class=\"button\" onclick=ChangeReserved('" + license + "','" + 0 + "')>Public</button><button class=\"button\" onclick=ChangeReserved('" + license + "','" + 1 + "')>Reserved 1</button><button class=\"button\" onclick=ChangeReserved('" + license + "','" + 2 + "')>Reserved 2</button><button class=\"button\" onclick=ChangeReserved('" + license + "','" + 3 + "')>Reserved 3</button></td><td><form><input type=\"number\" pattern=\"\d+\" id=\"priority\" placeholder=\"1 to 100\" onkeypress=\"return noenter()\" onchange=\"handleChange(this)\"></form><button class=\"button\" onclick=ChangePriority('" + license + "','True')>Add</button><button class=\"button\" onclick=ChangePriority('" + license + "','False')>Remove</button></td><td><button class=\"button\" onclick=BanUser('" + license + "')>Ban User</button><button class=\"button\" onclick=KickUser('" + license + "')>Kick User</button></td></tr>");
	$('#edit').show();
	return;
}

function BanUser(license)
{
	var obj = { License: license }
	$.post('http://'+resname+'/BanUser', JSON.stringify(obj));
	ClosePanel();
	return;
}

function KickUser(license)
{
	var obj = { License: license }
	$.post('http://'+resname+'/KickUser', JSON.stringify(obj));
	ClosePanel();
	return;
}

function ChangePriority(license, change)
{
	if (change == 'True')
	{
		change = document.getElementById("priority").value;
	}
	var obj = { License: license , Value: change}
	$.post('http://'+resname+'/ChangePriority', JSON.stringify(obj));
	ClosePanel();
	return;
}

function ChangeReserved(license, value)
{
	var obj = { License: license , Value: value}
	$.post('http://'+resname+'/ChangeReserved', JSON.stringify(obj));
	ClosePanel();
	return;
}

$(function()
{
    window.addEventListener('message', function(event)
    {
        var item = event.data;
        var buf = $('#panel');
		if (item.resname)
		{
			resname = item.resname;
			return;
		}
        if (item.panel && item.panel == 'close')
        {
            document.getElementById("list").innerHTML = "";
            $('#panel').hide();
			$('#edit').hide();
            return;
        }
		if (item.sessionlist)
		{
			var table = buf.find('table');
			table.append("<tr class=\"heading\"><th>Handle</th><th>License</th><th>Steam</th><th>Name</th><th>Reserved</th><th>Reserved Used</th><th>Priority</th><th>State</th><th>Options</th></tr>");
			table.append(item.sessionlist);
			$('#panel').show();
			return;
		}
    }, false);
	
	$(document).keyup(function(e)
    {
        if (e.keyCode == 27 || e.keyCode == 8) // Esc
		{
            if ($('#edit').css('display') == 'block')
			{
				BackPanel();
				return;
			}
			ClosePanel();
			return;
        }
    });
});