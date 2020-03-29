var uri = 'https://azure.microsoft.com/pt-br/cognitive-services/demo/visionanalysisapi/';

function imageAnalize(url, callback) {

	// Token param POST
	let token = 'Y6dcniKwRPFutibkeu9WEcdQVMb5I9FJiOOXWWfG-yUYQMd9Liy7pEba-qxsfnB7a_30MukHCfi27ePu8LLxXK0z8Vw1';

	setCookie(function() {

		$.post(uri, {'__RequestVerificationToken': token, 'Image.Url': url}, function(data) {

			let descriptionD = data;
			let marksD = data;
			let extensionD = data;
			let dimensionsD = data;
			let clipArtD = data;
			let lineD = data;
			let blackWhiteD = data;
			let adultD = data;
			let adultScoreD = data;
			let sexualContentD = data;
			let sexualContentScoreD = data;
			let categoriesD = data;
			let facesD = data;
			let predominantColorBgD = data;
			let predominantColorFirtD = data;
			let destackColorD = data;

			descriptionD = descriptionD.replace(/ /g, '');
			descriptionD = descriptionD.replace(/(\r\n|\n|\r)/g, '');
			descriptionD = descriptionD.match(/<tdid="imgDescription">(.*?)<\/td>/g);
			descriptionD = descriptionD[0].replace(/<tdid="imgDescription">(.*?)<\/td>/g, '$1');
			descriptionD = descriptionD.replace(/&quot;/g, '"');
			descriptionD = jQuery.parseJSON(descriptionD);

			descriptionD.captions[0].text = data.replace(/(\r\n|\n|\r)/g, '');
			descriptionD.captions[0].text = data.match(/&quot;(.*?)&quot/g);

			let indexCaption = null;

			$.each(descriptionD.captions[0].text, function(index, val) {
				let space = descriptionD.captions[0].text[index].match(/ /g);
				if (Array.isArray(space)) {
					indexCaption = index;
				}
			});

			descriptionD.captions[0].text = descriptionD.captions[0].text[indexCaption];
			descriptionD.captions[0].text = descriptionD.captions[0].text.replace(/(&quot;&quot|&quot;|&quot)/g, '');

			marksD = marksD.replace(/ /g, '');
			marksD = marksD.replace(/(\r\n|\n|\r)/g, '');
			marksD = marksD.match(/<td>Marcas<\/td><td>(.*?)<\/td>/g);
			marksD = marksD[0].replace(/<td>Marcas<\/td><td>(.*?)<\/td>/g, '$1');
			marksD = marksD.replace(/&quot;/g, '"');
			marksD = jQuery.parseJSON(marksD);

			extensionD = extensionD.replace(/ /g, '');
			extensionD = extensionD.replace(/(\r\n|\n|\r)/g, '');
			extensionD = extensionD.match(/<td>Formatodaimagem<\/td><td>(.*?)<\/td>/g);
			extensionD = extensionD[0].replace(/<td>Formatodaimagem<\/td><td>(.*?)<\/td>/g, '$1');
			extensionD = extensionD.replace(/&quot;/g, '"');
			extensionD = jQuery.parseJSON(extensionD);

			dimensionsD = dimensionsD.replace(/ /g, '');
			dimensionsD = dimensionsD.replace(/(\r\n|\n|\r)/g, '');
			dimensionsD = dimensionsD.match(/esdaimagem<\/td><td>(.*?)<\/td>/g);
			dimensionsD = dimensionsD[0].replace(/esdaimagem<\/td><td>(.*?)<\/td>/g, '$1');
			dimensionsD = dimensionsD.replace(/&quot;/g, '');
			dimensionsD = dimensionsD.split('x');
			dimensionsD = {width: dimensionsD[1], heigth: dimensionsD[0]}

			clipArtD = clipArtD.replace(/ /g, '');
			clipArtD = clipArtD.replace(/(\r\n|\n|\r)/g, '');
			clipArtD = clipArtD.match(/<td>Tipodeclip-art<\/td><td>(.*?)<\/td>/g);
			clipArtD = clipArtD[0].replace(/<td>Tipodeclip-art<\/td><td>(.*?)<\/td>/g, '$1');
			clipArtD = clipArtD.replace(/&quot;/g, '');
			clipArtD = parseInt(clipArtD);

			lineD = lineD.replace(/ /g, '');
			lineD = lineD.replace(/(\r\n|\n|\r)/g, '');
			lineD = lineD.match(/<td>Tipododesenhodelinha<\/td><td>(.*?)<\/td>/g);
			lineD = lineD[0].replace(/<td>Tipododesenhodelinha<\/td><td>(.*?)<\/td>/g, '$1');
			lineD = lineD.replace(/&quot;/g, '');
			lineD = parseInt(lineD);

			blackWhiteD = blackWhiteD.replace(/ /g, '');
			blackWhiteD = blackWhiteD.replace(/(\r\n|\n|\r)/g, '');
			blackWhiteD = blackWhiteD.match(/<td>Pretoebranco<\/td><td>(.*?)<\/td>/g);
			blackWhiteD = blackWhiteD[0].replace(/<td>Pretoebranco<\/td><td>(.*?)<\/td>/g, '$1');
			blackWhiteD = blackWhiteD.replace(/&quot;/g, '');
			if (blackWhiteD === 'false') {
				blackWhiteD = false;
			}else if (blackWhiteD === 'true') {
				blackWhiteD = true;
			}

			adultD = adultD.replace(/ /g, '');
			adultD = adultD.replace(/(\r\n|\n|\r)/g, '');
			adultD = adultD.match(/dosomenteparaadultos<\/td><td>(.*?)<\/td>/g);
			adultD = adultD[0].replace(/dosomenteparaadultos<\/td><td>(.*?)<\/td>/g, '$1');
			adultD = adultD.replace(/&quot;/g, '');
			if (adultD === 'false') {
				adultD = false;
			}else if (adultD === 'true') {
				adultD = true;
			}

			adultScoreD = adultScoreD.replace(/ /g, '');
			adultScoreD = adultScoreD.replace(/(\r\n|\n|\r)/g, '');
			adultScoreD = adultScoreD.match(/<td>Pontua&#231;&#227;odeconte&#250;dosomenteparaadultos<\/td><td>(.*?)<\/td>/g);
			adultScoreD = adultScoreD[0].replace(/<td>Pontua&#231;&#227;odeconte&#250;dosomenteparaadultos<\/td><td>(.*?)<\/td>/g, '$1');
			adultScoreD = adultScoreD.replace(/&quot;/g, '');
			adultScore =  parseFloat(adultScoreD);

			sexualContentD = sexualContentD.replace(/ /g, '');
			sexualContentD = sexualContentD.replace(/(\r\n|\n|\r)/g, '');
			sexualContentD = sexualContentD.match(/<td>Conte&#250;dosexual<\/td><td>(.*?)<\/td>/g);
			sexualContentD = sexualContentD[0].replace(/<td>Conte&#250;dosexual<\/td><td>(.*?)<\/td>/g, '$1');
			sexualContentD = sexualContentD.replace(/&quot;/g, '');
			if (sexualContentD === 'false') {
				sexualContentD = false;
			}else if (sexualContentD === 'true') {
				sexualContentD = true;
			}

			sexualContentScoreD = sexualContentScoreD.replace(/ /g, '');
			sexualContentScoreD = sexualContentScoreD.replace(/(\r\n|\n|\r)/g, '');
			sexualContentScoreD = sexualContentScoreD.match(/<td>Pontua&#231;&#227;odeconte&#250;dosexual<\/td><td>(.*?)<\/td>/g);
			sexualContentScoreD = sexualContentScoreD[0].replace(/<td>Pontua&#231;&#227;odeconte&#250;dosexual<\/td><td>(.*?)<\/td>/g, '$1');
			sexualContentScoreD = sexualContentScoreD.replace(/&quot;/g, '');
			sexualContentScoreD =  parseFloat(sexualContentScoreD);

			categoriesD = categoriesD.replace(/ /g, '');
			categoriesD = categoriesD.replace(/(\r\n|\n|\r)/g, '');
			categoriesD = categoriesD.match(/<tdid="categories">(.*?)<\/td>/g);
			categoriesD = categoriesD[0].replace(/<tdid="categories">(.*?)<\/td>/g, '$1');
			categoriesD = categoriesD.replace(/&quot;/g, '"');
			categoriesD = $.parseJSON(categoriesD);

			facesD = facesD.replace(/ /g, '');
			facesD = facesD.replace(/(\r\n|\n|\r)/g, '');
			facesD = facesD.match(/<td>Faces<\/td><td>(.*?)<\/td>/g);
			facesD = facesD[0].replace(/<td>Faces<\/td><td>(.*?)<\/td>/g, '$1');
			facesD = facesD.replace(/&quot;/g, '"');
			facesD = $.parseJSON(facesD);

			predominantColorBgD = predominantColorBgD.replace(/ /g, '');
			predominantColorBgD = predominantColorBgD.replace(/(\r\n|\n|\r)/g, '');
			predominantColorBgD = predominantColorBgD.match(/<td>Teladefundodecorpredominante<\/td>(.*?)<\/td>/g);
			predominantColorBgD = predominantColorBgD[0].match(/<\/div>(.*?)<\/td>/g);
			predominantColorBgD = predominantColorBgD[0].replace(/<\/div>(.*?)<\/td>/g, '$1');
			predominantColorBgD = predominantColorBgD.replace(/&quot;/g, '"');
			predominantColorBgD = $.parseJSON(predominantColorBgD);

			predominantColorFirtD = predominantColorFirtD.replace(/ /g, '');
			predominantColorFirtD = predominantColorFirtD.replace(/(\r\n|\n|\r)/g, '');
			predominantColorFirtD = predominantColorFirtD.match(/<td>Primeiroplanodecorpredominante<\/td>(.*?)<\/td>/g);
			predominantColorFirtD = predominantColorFirtD[0].match(/<\/div>(.*?)<\/td>/g);
			predominantColorFirtD = predominantColorFirtD[0].replace(/<\/div>(.*?)<\/td>/g, '$1');
			predominantColorFirtD = predominantColorFirtD.replace(/&quot;/g, '"');
			predominantColorFirtD = $.parseJSON(predominantColorFirtD);

			destackColorD = destackColorD.replace(/ /g, '');
			destackColorD = destackColorD.replace(/(\r\n|\n|\r)/g, '');
			destackColorD = destackColorD.match(/<td>Cordedestaque<\/td>(.*?)<\/td>/g);
			destackColorD = destackColorD[0].match(/<\/div>(.*?)<\/td>/g);
			destackColorD = destackColorD[0].replace(/<\/div>(.*?)<\/td>/g, '$1');
			destackColorD = destackColorD.replace(/&quot;/g, '');

			let obj = {
				description: descriptionD,
				marks: marksD,
				extension: extensionD,
				dimensions: dimensionsD,
				clipArt: clipArtD,
				line: lineD,
				blackWhite: blackWhiteD,
				adult: adultD,
				adultScore: adultScoreD,
				sexualContent: sexualContentD,
				sexualContentScore: sexualContentScoreD,
				categories: categoriesD,
				faces: facesD,
				predominantColorBg: predominantColorBgD,
				predominantColorFirt: predominantColorFirtD,
				destackColor: destackColorD
			};

			callback({err: null, result: obj});

		}).fail(function() {
			callback({err: true, result: null});
		});
	});

}

function setCookie(callback) {

	let tagPost = '__RequestVerificationToken';
	let tokenUri = 'KuUtneAj7CzCgsgL9jSkWnC1w44HY8lX_okPCPvPsUNuaut4026WN_DOQszNmNwVasvnmnRI58MnCV4i2Z2_U0TZkKk1';

	chrome.cookies.remove({url: uri, name: tagPost}, function() {
		chrome.cookies.set({url: uri, name: tagPost, value: tokenUri}, function() {
			callback();
		});
	});
}

