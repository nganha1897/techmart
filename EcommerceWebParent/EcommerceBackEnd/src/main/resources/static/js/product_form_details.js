$(document).ready(function() {

	$("a[name='linkRemoveDetail']").each(function(index) {
		$(this).click(function() {
			removeDetailSectionByindex(index);
		});
	});
});

function addNextDetailSection() {
	allDivDetails = $("[id^='divDetail']");
	divDetailsCount = allDivDetails.length;

	htmlDetailSection = `
		<div class="form-inline" id="divDetail${divDetailsCount}">
		    <input type="hidden" name="detailIds" value="0" />
			<label class="m-3">Name</label>
			<input type="text" class="form-control w-25" name="detailNames" maxlength="256" />
			<label class="m-3">Value</label>
			<input type="text" class="form-control w-25" name="detailValues" maxlength="256" />
		</div>
	`;
	$("#divProductDetails").append(htmlDetailSection);
	previousDivDetailSection = allDivDetails.last();
	previousDivDetailId = previousDivDetailSection.attr("id");

	htmlLinkRemove = `
	    <a class="btn fas fa-times-circle fa-2xl icon-dark" 
	        href="javascript:removeDetailSectionById('${previousDivDetailId}')"
	        title="Remove this detail"></a>
	`;


	previousDivDetailSection.append(htmlLinkRemove);

	$("input[name='detailNames']").last().focus();
}

function removeDetailSectionById(id) {
	$("#" + id).remove();
}

function removeDetailSectionByindex(index) {
	$("#divDetail" + index).remove();
}