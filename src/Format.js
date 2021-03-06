/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../platform/Format.js"/>
/// <reference path="../../sdata/SDataService.js"/>

define('Mobile/SalesLogix/Format', ['Sage/Platform/Mobile/Format'], function() {
    
    dojo.setObject('Mobile.SalesLogix.Format', null);
    
    Mobile.SalesLogix.Format = (function(F) {
        return dojo.mixin({}, {
            /**
             * Address Culture Formats as defined by Mobile.SalesLogix.Format.address
             * Sources:
             * http://www.columbia.edu/~fdc/postal/
             * http://msdn.microsoft.com/en-us/library/cc195167.aspx
             * http://en.wikipedia.org/wiki/Address_(geography)
             */
            addressCultureFormats: {
                'en-US': 's|a1|a2|a3|m R p|C',
                'en-GB': 's|a1|a2|a3|M|P|C',
                'fr-FR': 's|a1|a2|a3|p M|C',
                'de-DE': 's|a1|a2|a3|p m|C',
                'it-IT': 's|a1|a2|a3|p m Z|C',
                'ru-RU': 's|a1|a2|a3|p m|C'
            },
            /**
             * Country name to culture identification
             * Source:
             * http://msdn.microsoft.com/en-us/goglobal/bb896001.aspx
             */
            countryCultures: {
                'USA': 'en-US',
                'United States': 'en-US',
                'United States of America': 'en-US',
                'US': 'en-US',
                'United Kingdom':'en-GB',
                'UK':'en-GB',
                'Britain':'en-GB',
                'England':'en-GB',
                'Russia': 'ru-RU',
                'Россия': 'ru-RU',
                'Italy': 'it-IT',
                'Italia': 'it-IT',
                'France': 'fr-FR',
                'Germany': 'de-DE',
                'Deutschland': 'de-DE'
            },
            /**
            Converts the given value using the provided format, joining with the separator character
            If no format given, will use predefined format for the addresses Country (or en-US as final fallback)
            <pre>
            Format	Description									Example
            ------	-----------------------------------------	-----------------------
             s 		Salutation (Attention, Name)    			ATTN: Mr. Bob
             S 		Salutation Uppercase						ATTN: MR. BOB
             a1		Address Line 1                  			555 Oak Ave
             a2		Address Line 2			                    #2038
             a3		Address Line 3
             m		Municipality (City, town, hamlet)			Phoenix
             M		Municipality Uppercase						PHOENIX
             z		County (parish, providence)					Maricopa
             Z 		County Uppercase							MARICOPA
             r		Region (State, area)                		AZ
             R		Region Uppercase							AZ
             p     	Postal Code (ZIP code)						85021
             P     	Postal Code Uppercase						85021
             c 		Country 									France
             C 		Country Uppercase							FRANCE

             |		separator			    					as defined by separator variable
             </pre>
             @param {object} o Address Entity containing all the SData properties
             @param {bool} asText If set to true returns text only, if false returns anchor link to google maps
             @param {string|bool} separator If false - separates with html <br>,
                                  if true - separates with line return,
                                  if defined as string - uses string to separate
             @param {string} fmt Address format to use, may also pass a culture string to use predefined format
             @return {string} Formatted address
            */
            address: function(o, asText, separator, fmt){
                var lines = [],
                    isEmpty = function(line){
                        var filterSymbols = dojo.trim(line.replace(/,|\(|\)|\.|>|-|<|;|:|'|"|\/|\?|\[|\]|{|}|_|=|\+|\\|\||!|@|#|\$|%|\^|&|\*|`|~/g,''));
                        return filterSymbols === '';
                    },
                    clean = function(line){
                        return dojo.trim(line.replace(/ {2,}/g, ' '));
                    },
                    _this = Mobile.SalesLogix.Format;

                if(!fmt)
                    fmt = _this.countryCultures[o.Country] || 'en-US';

                if(typeof _this.addressCultureFormats[fmt] !== 'undefined')
                    fmt = _this.addressCultureFormats[fmt];

                if(fmt.indexOf('|') === -1)
                    lines = [fmt];
                else
                    lines = fmt.split('|');

                for(var i=0; i<lines.length; i++){
                    var line = _this.replaceAddressPart(lines[i], o);
                    if(isEmpty(line)){
                        lines.splice(i,1); i--;
                    } else {
                        lines[i] = clean(line);
                    }
                }
                if (asText) return separator ? lines.join(typeof separator === 'string' ? separator : '\n') : lines.join('<br />');

                return dojo.string.substitute(
                    '<a target="_blank" href="http://maps.google.com/maps?q=${1}">${0}</a>',
                    [lines.join('<br />'), encodeURIComponent(lines.join(' '))]
                );
            },
            replaceAddressPart: function(fmt, o){
                return fmt.replace(/s|S|a1|a2|a3|m|M|z|Z|r|R|p|P|c|C/g,
                    function (format) {
                        switch (format) {
                        case "s":
                            return o.Salutation || '';
                        case "S":
                            return (o.Salutation && o.Salutation.toUpperCase()) || '';
                        case "a1":
                            return o.Address1 || '';
                        case "a2":
                            return o.Address2 || '';
                        case "a3":
                            return o.Address3 || '';
                        case "m":
                            return o.City || '';
                        case "M":
                            return (o.City && o.City.toUpperCase()) || '';
                        case "z":
                            return o.County || '';
                        case "Z":
                            return (o.County && o.County.toUpperCase()) || '';
                        case "r":
                            return o.State || '';
                        case "R":
                            return (o.State && o.State.toUpperCase()) || '';
                        case "p":
                            return o.PostalCode || '';
                        case "P":
                            return (o.PostalCode && o.PostalCode.toUpperCase()) || '';
                        case "c":
                            return o.Country || '';
                        case "C":
                            return (o.Country && o.Country.toUpperCase()) || '';
                        default: return '';
                        }
                    }
                );
            },
            /*
                {0}: original value
                {1}: cleaned value
                {2}: entire match (against clean value)
                {3..n}: match groups (against clean value)
            */
            phoneFormat: [{
                test: /^\+.*/,
                format: '${0}'
            },{
                test: /^(\d{3})(\d{3,4})$/,
                format: '${3}-${4}'
            },{
                test: /^(\d{3})(\d{3})(\d{2,4})$/, // 555 555 5555
                format: '(${3})-${4}-${5}'
            },{
                test: /^(\d{3})(\d{3})(\d{2,4})([^0-9]{1,}.*)$/, // 555 555 5555x
                format: '(${3})-${4}-${5}${6}'
            },{
                test: /^(\d{11,})(.*)$/,
                format: '${1}'
            }],
            phone: function(val, withLink) {
                if (typeof val !== 'string')
                    return val;

                var formatters = Mobile.SalesLogix.Format.phoneFormat,
                    clean = /^\+/.test(val)
                        ? val
                        : val.replace(/[^0-9x]/ig, ''),
                    number;

                for (var i = 0; i < formatters.length; i++)
                {
                    var formatter = formatters[i],
                        match;
                    if ((match = formatter.test.exec(clean)))
                        number = dojo.string.substitute(formatter.format, [val, clean].concat(match));
                }

                if (number)
                    return withLink === false
                        ? number
                        : dojo.string.substitute('<a href="tel:${0}">${1}</a>', [clean, number]);

                return val;
            },
            currency: function(val) {
                // todo: add localization support
                var v = Mobile.SalesLogix.Format.fixed(val), // only 2 decimal places
                    f = Math.floor((100 * (v - Math.floor(v))).toPrecision(2)); // for fractional part, only need 2 significant digits

                return dojo.string.substitute(
                    '$${0}.${1}', [
                        (Math.floor(v)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                        (f.toString().length < 2) ? '0' + f.toString() : f.toString()
                    ]
                );
            },
            nameLF: function(val) {
                if (!val) return '';

                var name = Mobile.SalesLogix.Template.nameLF.apply(val);
                if (name == ', ')
                    name = '';

                return name;
            },
            mail: function(val) {
                if (typeof val !== 'string')
                    return val;

                return dojo.string.substitute('<a href="mailto:${0}">${0}</a>', [val]);
            }
        }, F);
    })(Sage.Platform.Mobile.Format);
    
});