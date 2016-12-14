(function() {
	function error(msg) {
		Qm.warning(typeof msg === 'string' && msg || '服务器异常');
	}
	
	$.fn.extend({
		error : error
	});
})();