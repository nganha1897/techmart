decimalsSeparator = decimalsPointType == 'COMMA' ? ',' : '.';
thousandsSeparator = thousandsPointType == 'COMMA' ? ',' : '.';

$(document).ready(function() {
	$(".linkMinus").on("click", function(evt) {
		evt.preventDefault();
		decreaseQuantity($(this));
	});

	$(".linkPlus").on("click", function(evt) {
		evt.preventDefault();
		increaseQuantity($(this));
	});

	$(".linkRemove").on("click", function(evt) {
		evt.preventDefault();
		removeProduct($(this));
	});
});

function decreaseQuantity(link) {
	productId = link.attr("pid");
	quantityInput = $("#quantity" + productId);
	newQuantity = parseInt(quantityInput.val()) - 1;
	if (newQuantity > 0) {
		quantityInput.val(newQuantity);
		updateQuantity(productId, newQuantity);
	} else {
		showWarningModal("Minimum quantity is 1");
	}
}

function increaseQuantity(link) {
	productId = link.attr("pid");
	quantityInput = $("#quantity" + productId);
	newQuantity = parseInt(quantityInput.val()) + 1;
	if (newQuantity <= 5) {
		quantityInput.val(newQuantity);
		updateQuantity(productId, newQuantity);
	} else {
		showWarningModal("Maximum quantity is 5");
	}
}

function updateQuantity(productId, quantity) {
	url = contextPath + "cart/update/" + productId + "/" + quantity;

	$.ajax({
		type: "POST",
		url: url,
		beforeSend: function(xhr) {
			xhr.setRequestHeader(csrfHeaderName, csrfValue);
		}
	}).done(function(updatedSubTotal) {
		updateSubTotal(updatedSubTotal, productId);
		updateTotal();
	}).fail(function() {
		showErrorModal("Error while updating product quantity!");
	});
}

function updateSubTotal(updatedSubTotal, productId) {
	$("#subTotal" + productId).text(formatCurrency(updatedSubTotal));
}

function updateTotal() {
	total = 0.0;
	productCount = 0;
	$(".subTotal").each(function(index, element) {
		total += parseFloat(clearCurrencyFormat(element.innerHTML));
		productCount++;
	});
	if (productCount < 1) {
		showEmptyShoppingCart();
	} else {
		$("#total").text(formatCurrency(total));
	}
}

function showEmptyShoppingCart() {
	$("#sectionTotal").hide();
	$("#sectionEmptyCartMessage").removeClass("d-none");
}

function removeProduct(link) {
	url = link.attr("href");

	$.ajax({
		type: "DELETE",
		url: url,
		beforeSend: function(xhr) {
			xhr.setRequestHeader(csrfHeaderName, csrfValue);
		}
	}).done(function(response) {
		rowNumber = link.attr("rowNumber");
		removeProductHtml(rowNumber);
		updateTotal();
		updateCountNumbers();
		showModalDialog("Shopping Cart", response);
	}).fail(function() {
		showErrorModal("Error while removing product quantity!");
	});
}

function removeProductHtml(rowNumber) {
	$("#row" + rowNumber).remove();
	$("#blankLine" + rowNumber).remove();
}

function updateCountNumbers() {
	$(".divCount").each(function(index, element) {
		element.innerHTML = "" + (index + 1);
	});
}

function formatCurrency(amount) {
	return $.number(amount, decimalDigits, decimalsSeparator, thousandsSeparator);
}

function clearCurrencyFormat(numberString) {
	result = numberString.replaceAll(thousandsSeparator, "");
	return result.replaceAll(decimalsSeparator, ".");
}