var _data={};
var _modData=[];
var _tempData=[];

function displayDiseaseName()
{
var length=getData().content[0].disease.length;
var html=[];
html.push('<ul id="disease_name">')
for(i=0;i<length;i=i+1)
	{
		html.push('<li>'+getData().content[0].disease[i].dname+'</li>');
	}
html.push('</ul>');
$("#disease_container").append(html.join(""));
}
function displaymedicineName()
{
	var length=getData().content[1].medicine.length;
	var html=[];
	html.push('<ul id="medicine_name">')
	for(i=0;i<length;i=i+1)
		{
			html.push('<li>'+getData().content[1].medicine[i].medName+'</li>');
		}
	html.push('</ul>');
	$("#medicine_container").append(html.join(""));
}
function displayCommonName(commonName)
{
	$("#display_container").empty();
	var length=commonName.length;
	var html=[];
	html.push('<ul id="display_name">')
	for(i=0;i<length;i=i+1)
		{
			html.push('<li>'+commonName[i]+'</li>');
		}
	html.push('</ul>');
	$("#display_container").append(html.join(""));
}
function findCommon()
{var html=[];
	$( ".select" ).each(function(){
		var index=$(this).attr("index");
		html.push(index);
		
	});
	findCommon1(html);
}
function findCommon1(html)
{
	//alert(html.length+"  "+html[0]+"  "+html[1]);
	var length=html.length;
	var index=html.pop();
	var calculate=getData().content[0].disease[index].mname;
	if(html.length)
	{
	for(var i=1;i<length;i+=1)
		{
			index=html.pop();
			var temp=getData().content[0].disease[index].mname;
			calculate=findCommonName(calculate,temp);
		}
	}
	displayCommonName(calculate);
}
function findCommonName(arr1,arr2)
{
	var common=[];
	var i,j;
	for(i=0;i<arr1.length;i+=1)
		{
		for(j=0;j<arr2.length;j+=1)
			{
			if(arr1[i]===arr2[j])
				{
				common.push(arr1[i]);
				}
			
			}
		
		}
	return common;
}
function loadData()
{
	$.ajax({
        dataType : 'json',
        url : 'disease.json',
        async : false,
        cache : true,
        success : function (data)
                   {
                    setData(data);
                   },
        error : function (XMLHttpRequest, textStatus, errorThrown)
                 {
                  //console.info('ERROR => XMLHttpRequest:');
                  //console.debug(XMLHttpRequest);
                  //console.info('ERROR => textStatus:');
                  //console.debug(textStatus);
                  //console.info('ERROR => errorThrown:');
                  //console.debug(errorThrown);
                  return false;
                 }
       });
}

function bindData()
{
	$("#disease_name").off("click").on("click","li",function(){
		$(this).toggleClass("select");
		
		var index=$(this).index();
		$(this).attr("index",index);
		if($(this).hasClass("select"))
			{
			HighlightmName(index);
			}
		else
			{
			$("#medicine_name").children("li").removeClass("checked"+index);
			}
		//alert(index);
	});
	$("#medicine_name").off("click").on("click","li",function(){
		var temp=$(".select").index();
		$(this).toggleClass("checked"+temp);
	});
}
function HighlightmName(index)
{
	//$("#medicine_name").children("li").removeClass("checked");
	var medName=[];
	var length=getData().content[1].medicine.length;
	for(var k=0;k<length;k+=1)
		{
		medName.push(getData().content[1].medicine[k].medName);
		}
	var mname=getData(0).content[0].disease[index].mname;
	var i,j;
	for(i=0;i<medName.length;i+=1)
		{
		for(j=0;j<mname.length;j+=1)
			{
			if(medName[i]===mname[j])
				{
				$("ul#medicine_name").find("li").eq(i).addClass("checked"+index);
				}
			
			}
		
		}
	
	
}
function render()
{
	loadData();
	displayDiseaseName();
	displaymedicineName();
	bindData();
}
function setData(value)
{
 _data = value;
}
function getData()
{
 return _data;
}
function addData()
{
	var index=$(".select").index();
	var mname=[];
	$( "[class^='checked']" ).each(function( index ) {
		mname.push($(this).text());
		});
	_tempData.push({
		"index":index,
		"mname":mname
	});
}
function replaceData()
{
	_modData=getData().content[0].disease;
	if(_tempData.length)
		{
		for(var i=0;i<_tempData.length;i+=1)
			{ var temp=_tempData.pop();
			var index=temp.index;
			_modData[index].mname=temp.mname;
			}
		}
}
function produceJson()
{
	var produce=[];
	produce.push('{"content":[{"disease":');
    produce.push(JSON.stringify(_modData));
    produce.push('},{"medicine": [{"medName":"a"},{"medName":"b"},{"medName":"c"},{"medName":"d"},{"medName":"e"},{"medName":"f"},{"medName":"g"},{"medName":"h"},{"medName":"i"},{"medName":"j"},{"medName":"k"},{"medName":"l"},{"medName":"m"},{"medName":"n"},{"medName":"o"},{"medName":"p"} ] } ]}');
	produce=produce.join("");
	$("#textarea").text(produce);
}
$(document).ready(function(){
	render();
});