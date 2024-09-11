import { EOL } from 'os';

export class CliLog {
	static Black          = '\x1b[30m';
	static Red            = '\x1b[31m';
	static Green          = '\x1b[32m';
	static Yellow         = '\x1b[33m';
	static Blue           = '\x1b[34m';
	static Magenta        = '\x1b[35m';
	static Cyan           = '\x1b[36m';
	static LightGray      = '\x1b[37m';
	static DarkGray       = '\x1b[90m';
	static LightRed       = '\x1b[91m';
	static LightGreen     = '\x1b[92m';
	static LightYellow    = '\x1b[93m';
	static LightBlue      = '\x1b[94m';
	static LightMagenta   = '\x1b[95m';
	static LightCyan      = '\x1b[96m';
	static White          = '\x1b[97m';

	static BgBlack        = '\x1b[40m';
	static BgRed          = '\x1b[41m';
	static BgGreen        = '\x1b[42m';
	static BgYellow       = '\x1b[43m';
	static BgBlue         = '\x1b[44m';
	static BgMagenta      = '\x1b[45m';
	static BgCyan         = '\x1b[46m';
	static BgLightGray    = '\x1b[47m';
	static BgDarkGray     = '\x1b[100m';
	static BgLightRed     = '\x1b[101m';
	static BgLightGreen   = '\x1b[102m';
	static BgLightYellow  = '\x1b[103m';
	static BgLightBlue    = '\x1b[104m';
	static BgLightMagenta = '\x1b[105m';
	static BgLightCyan    = '\x1b[106m';
	static BgWhite        = '\x1b[107m';

	static Bold	          = '\x1b[1m';
	static Underline      = '\x1b[4m';
	static NoUnderline    = '\x1b[24m';
	static ReverseText    = '\x1b[7m';
	static PositiveText   = '\x1b[27m';

	/** @type {string} */
	buffer = '';

	/**
	 * @param {string} message
	 * @returns {this}
	 */
	msg(message) {
		this.buffer += message;
		return this;
	}

	/**
	 * @param {string} message
	 * @param {boolean} [reset]
	 * @returns {this}
	 */
	ln(message, reset = false) {
		this.buffer += message;
		if (reset) this.reset();
		this.buffer += EOL;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	info(message = '') {
		console.log(this.buffer + message);
		this.buffer = '';
		return this.reset();
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	log(message = '') {
		console.log(this.buffer + message);
		this.buffer = '';
		return this.reset();
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	warn(message = '') {
		console.warn(this.buffer + message);
		this.buffer = '';
		return this.reset();
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	error(message = '') {
		console.error(this.buffer + message);
		this.buffer = '';
		return this.reset();
	}

	color(color = CliLog.Black, message = '') {
		this.buffer += color + message;
		return this;
	}

	style(style, message = '') {
		this.buffer += style + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	reset(message = '') {
		this.buffer += '\x1b[0m' + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	black(message = '') {
		this.buffer += CliLog.Black + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	red(message = '') {
		this.buffer += CliLog.Red + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	green(message = '') {
		this.buffer += CliLog.Green + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	yellow(message = '') {
		this.buffer += CliLog.Yellow + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	blue(message = '') {
		this.buffer += CliLog.Blue + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	magenta(message = '') {
		this.buffer += CliLog.Magenta + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	cyan(message = '') {
		this.buffer += CliLog.Cyan + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	lightGray(message = '') {
		this.buffer += CliLog.LightGray + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	darkGray(message = '') {
		this.buffer += CliLog.DarkGray + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	lightRed(message = '') {
		this.buffer += CliLog.LightRed + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	lightGreen(message = '') {
		this.buffer += CliLog.LightGreen + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	lightYellow(message = '') {
		this.buffer += CliLog.LightYellow + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	lightBlue(message = '') {
		this.buffer += CliLog.LightBlue + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	lightMagenta(message = '') {
		this.buffer += CliLog.LightMagenta + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	lightCyan(message = '') {
		this.buffer += CliLog.LightCyan + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	white(message = '') {
		this.buffer += CliLog.White + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgBlack(message = '') {
		this.buffer += CliLog.BgBlack + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgRed(message = '') {
		this.buffer += CliLog.BgRed + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgGreen(message = '') {
		this.buffer += CliLog.BgGreen + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgYellow(message = '') {
		this.buffer += CliLog.BgYellow + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgBlue(message = '') {
		this.buffer += CliLog.BgBlue + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgMagenta(message = '') {
		this.buffer += CliLog.BgMagenta + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgCyan(message = '') {
		this.buffer += CliLog.BgCyan + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgLightGray(message = '') {
		this.buffer += CliLog.BgLightGray + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgDarkGray(message = '') {
		this.buffer += CliLog.BgDarkGray + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgLightRed(message = '') {
		this.buffer += CliLog.BgLightRed + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgLightGreen(message = '') {
		this.buffer += CliLog.BgLightGreen + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgLightYellow(message = '') {
		this.buffer += CliLog.BgLightYellow + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgLightBlue(message = '') {
		this.buffer += CliLog.BgLightBlue + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgLightMagenta(message = '') {
		this.buffer += CliLog.BgLightMagenta + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgLightCyan(message = '') {
		this.buffer += CliLog.BgLightCyan + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bgWhite(message = '') {
		this.buffer += CliLog.BgWhite + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	bold(message = '') {
		this.buffer += CliLog.Bold + message;
		return this;
	}

	/**
	 * @param {string} [message]
	 * @returns {this}
	 */
	underline(message = '') {
		this.buffer += CliLog.Underline + message;
		return this;
	}
}
