(function(_helper) {
	let _config = null;

	function initConfig()
	{
		if (!hexo.config.fbcomments)
			return(false);
		_config = hexo.config.fbcomments;
		_config.enabled = _config.enabled || true;
		if (!_config.enabled)
			return(false);
		if (!_config.appId)
			throw "Hexo-FBComments error: Facebook AppId not found. Set it in your config.yml file or uninstall hex_fbcomments, or disable it in the config.yml file."
		_config.lang = _config.lang || 'en_GB';
		_config.numPosts = _config.numPosts || 5;
		_config.order_by = _config.order_by || 'time';
		_config.colorscheme = _config.colorscheme || 'dark';
		_config.width = _config.width || '550px';
		return(true);
	}

	function fbcommentshead()
	{
		if (!initConfig()) return("");
		let html = '<div id="fb-root"></div>' + '\n';
		html += '<script>(function(d, s, id) {' + '\n';
		html += 'var js, fjs = d.getElementsByTagName(s)[0];' + '\n';
		html += 'if (d.getElementById(id)) return;' + '\n';
		html += 'js = d.createElement(s); js.id = id;' + '\n';
		html += 'js.src = "//connect.facebook.net/';
		html += _config.lang; // language
		html += '/sdk.js#xfbml=1&version=v3.1&appId=';
		html += _config.appId; // appid
		html += '&autoLogAppEvents=1';
		html += '&colorscheme=' + _config.colorscheme; // colorscheme
		html += '&order_by=' + _config.order_by + '";\n'; // order by
		html += 'fjs.parentNode.insertBefore(js, fjs);' + '\n';
		html += "}(document, 'script', 'facebook-jssdk'));</script>" + '\n';
		return html;
	}

	function fbcomments(permaLink)
	{
		if (!initConfig()) return("");
		permaLink = permaLink || "err";
		let html = '<section id="comments">' + '\n';
		html += '<div class="fb-comments" data-href="' + '\n';
		html += permaLink;
		html += '" data-numposts="';
		html += _config.numPosts;
		html += '"></div>' + '\n';
		html += '</section>' + '\n';
		return(html);
	}

	_helper.register('fbcomments', fbcomments);
	_helper.register('fbcommentshead', fbcommentshead);
})(hexo.extend.helper);
