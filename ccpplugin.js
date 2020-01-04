/**
 * @author adenuga558
 * @author cyberpride
 *  ccp is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *   
 *   ccp is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *   
 *   You should have received a copy of the GNU General Public License
 *   along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * properties
 * - setClass (String) -> Class of input field
 * - setBgColor (String) -> background of setClass
 * - setFontColor(String) -> font color of setClass
 * - setPrefix (Boolean) -> show prefix ture/false
 * 
 */
(function($){
	$.fn.phonecode = function(options){
            $defaults={
		setClass: null,
		setBgColor: 'white',
        setFontColor: 'black',
        setPrefix: true
		}
		$opt=$.extend(true,$defaults, options);
		$('.'+$opt.setClass).prop('disabled',true);
		$ele =$(this);
                setOptions($ele);
                //check prefix should be boolean
                if($opt.setPrefix===true | $opt.setPrefix===false){
                    $opt.setPrefix =$opt.setPrefix
                }
                else{
                    $.error("value of 'setPrefix' cannot be '"+$opt.setPrefix+"'");
                    $opt.setPrefix =$defaults.setPrefix;
                    
                }
	$ele.on('change',function(){
		$selected=$(this).val();
		if($opt.setClass!=null){
			$.ajax({
            type: "GET",
            url: "https://ccpapi.herokuapp.com/api/v1/country/"+$selected,
            datatype: "json",
            crossDomain : true,
            success:function(data){
            json=$.parseJSON(data);
            $.each(json, function(index, val) {
                if($opt.setPrefix===true){
                $('.'+$opt.setClass).val(val.phonecode);
                }
                else{
                $('.'+$opt.setClass).val(val.phonecode); 
                }
			 
                $('.'+$opt.setClass).css({'background':'url("img/'+val.code+'.png")',
                                        'background-size':'30px 20px',
			 							'background-repeat':'no-repeat',
			 							'padding-left':'50px',
			 							'background-color':$opt.setBgColor,
			 							'background-position':'5px 5px',
                                        'color':$opt.setFontColor
			 							});
		$('.'+$opt.setClass).prop('disabled',false);
            });
            }
		
	});
		}
	});
	}
}(jQuery));

function setOptions($el){
	$.ajax({
            type: "GET",
            url: "https://ccpapi.herokuapp.com/api/v1/country",
            datatype: "json",
            crossDomain : true,
            success:function(data){
            json=$.parseJSON(data);
            	$.each(json, function(arrayID,group) {
    				$($el).append('<option>'+group.name+'</option>'); 
     });
            }
		
	});
}
