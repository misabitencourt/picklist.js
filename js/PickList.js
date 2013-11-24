
PickList = function(){
	
	this.TYPE_ID = 0;
	this.TYPE_CLASS = 1;
	
	this.CLOSE_DIV = '</div>';
				
	this.ITENS_LIST = '<select size="10" id="item-list-#{ELEMENT}" name="#{NAME}-item-list"></select>';
	this.ITENS_LIST_LABEL = '<label for="item-list-#{ELEMENT}">#{ITENS-LABEL}</label>';
	this.ITENS_LIST_DIV = '<div class="picklist-left">';
	
	this.BUTTONS_DIV = '<div class="picklist-buttons">';
	this.BUTTON_ADD = '<div id="picklist-add-button-#{ELEMENT}" class="picklist-button"><span>#{ADD}</span></div>';
	this.BUTTON_REMOVE = '<div id="picklist-remove-button-#{ELEMENT}" class="picklist-button"><span>#{REMOVE}</span></div>';
	this.BUTTON_CLEAN = '<div id="picklist-clean-button-#{ELEMENT}" class="picklist-button"><span>#{CLEAN}</span></div>';
			
	this.ITENS_SELECTED_LIST = '<select size="10" id="selected-item-list-#{ELEMENT}" name="#{NAME}-selected-item-list"></select>';
	this.ITENS_SELECTED_LIST_LABEL = '<label for="selected-item-list-#{ELEMENT}">#{ITENS-SELECTED-LABEL}</label>';
	this.ITENS_SELECTED_LIST_DIV = '<div class="picklist-right">';
	
	this.SELECTED_INPUT_STRING = '<input type="hidden" id="selected-items-#{ELEMENT}" name="selected-items-#{ELEMENT}" />';
	
	this.create = function(properties){
		
		/*
		 * Getting elements 
		 */		
		var element = document.getElementById(properties.selector);				
				
		if (!element ||
			!properties.name){
			return 0;
		}
		
		var name = properties.name;				
		
		/*
		 *  Creating left side elements
		 */
		var htmlElements = this.ITENS_LIST_DIV;
		htmlElements += this.ITENS_LIST_LABEL.replace("#{ELEMENT}", element.id).replace("#{ITENS-LABEL}", properties.itensLabel);
		htmlElements += this.ITENS_LIST.replace("#{ELEMENT}", element.id);
		htmlElements += this.CLOSE_DIV;
		
		/*
		 *  Creating buttons on the middle
		 */
		htmlElements += this.BUTTONS_DIV;
		htmlElements += this.BUTTON_ADD.replace("#{ELEMENT}", element.id).replace("#{ADD}", properties.addLabel);
		htmlElements += this.BUTTON_REMOVE.replace("#{ELEMENT}", element.id).replace("#{REMOVE}", properties.removeLabel);
		htmlElements += this.BUTTON_CLEAN.replace("#{ELEMENT}", element.id).replace("#{CLEAN}", properties.cleanLabel);
		htmlElements += this.CLOSE_DIV;
		
		
		/*
		 *  Creating right side elements
		 */				
		htmlElements += this.ITENS_SELECTED_LIST_DIV;
		htmlElements += this.ITENS_SELECTED_LIST_LABEL.replace("#{ELEMENT}", element.id).replace("#{ITENS-SELECTED-LABEL}", properties.itensSelectedLabel);
		htmlElements += this.ITENS_SELECTED_LIST.replace("#{ELEMENT}", element.id);
		htmlElements += this.CLOSE_DIV.replace("#{ELEMENT}", element.id);
		htmlElements += this.SELECTED_INPUT_STRING.replace("#{ELEMENT}", element.id)
		                                          .replace("#{ELEMENT}", element.id);
		
		element.innerHTML = htmlElements;
		element.className += properties.clazz;
		
		/*
		 *  Element vars
		 */
		 var itensList = document.getElementById("item-list-#{ELEMENT}".replace("#{ELEMENT}", element.id));
		 var itensSelectedList = document.getElementById("selected-item-list-#{ELEMENT}".replace("#{ELEMENT}", element.id));
		 var buttonAdd = document.getElementById("picklist-add-button-#{ELEMENT}".replace("#{ELEMENT}", element.id));
		 var buttonRemove = document.getElementById("picklist-remove-button-#{ELEMENT}".replace("#{ELEMENT}", element.id));
		 var buttonClean = document.getElementById("picklist-clean-button-#{ELEMENT}".replace("#{ELEMENT}", element.id));
		 var selectedElementsString = document.getElementById("selected-items-#{ELEMENT}".replace("#{ELEMENT}", element.id));
		
		/*
		 * Fetching itens
		 */
		 var selectionItens = properties.selectionItens;
		 
		 for(var i=0; i<selectionItens.length; i++){
			
			var selectionItem = selectionItens[i];			 
			var option = '<option value="'+ selectionItem.value +'">';
			option += selectionItem.name;
			option += '</option>';
			
			if (selectionItem.selected){
				
				//Adds on right
				
				itensSelectedList.innerHTML += option;
				selectedElementsString.value += selectionItem.value + ";";
				
			}else{
				
				// Adds on left
				
				itensList.innerHTML += option;			
			}
		 }
		 
		 /*
		  *  Button add
		  */
		 buttonAdd.onclick = function(){
			
			if (itensList.selectedIndex == -1){
				return 0;
			}
			
			// TODO
			var option = itensList.options[itensList.selectedIndex];
			itensList.remove(itensList.selectedIndex);
			itensSelectedList.add(option);
			selectedElementsString.value +=  option.value + ";";			
		 };
		 
		 /*
		  *  Button remove
		  */
		 buttonRemove.onclick = function(){
			 
			if (itensSelectedList.selectedIndex == -1){
				return 0;
			}
			
			var option = itensSelectedList.options[itensSelectedList.selectedIndex];
			itensSelectedList.remove(itensSelectedList.selectedIndex);
			itensList.add(option);
			selectedElementsString.value = selectedElementsString.value.replace(option.value + ";", "");
		 };
		 
		 /*
		  *  Button clear
		  */
		 buttonClean.onclick = function(){
									
			var options = itensSelectedList.options;
			var arrOptions = [];
			
			for (var i=0; i<options.length; i++){
				arrOptions[arrOptions.length] = options[i];
			}
			
			for (var i=0; i<arrOptions.length; i++){
				itensList.add(arrOptions[i]);
			}
			
			itensSelectedList.innerHTML = "";			
			selectedElementsString.value = "";
		 };
		 
	};
	
};

$pick = new PickList();
