"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tc = __importStar(require("@actions/tool-cache"));
const download = __importStar(require("download"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const util = __importStar(require("util"));
const restm = __importStar(require("typed-rest-client/RestClient"));
let osPlat = os.platform();
let osArch = os.arch();
function getMage(version) {
    return __awaiter(this, void 0, void 0, function* () {
        const selected = yield determineVersion(version);
        if (selected) {
            version = selected;
        }
        console.log(`✅ Mage version found: ${version}`);
        const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'mage-'));
        const fileName = getFileName(version);
        const downloadUrl = util.format('https://github.com/magefile/mage/releases/download/v%s/%s', version, fileName);
        console.log(`⬇️ Downloading ${downloadUrl}...`);
        yield download.default(downloadUrl, tmpdir, { filename: fileName });
        console.log('📦 Extracting Mage...');
        let extPath = tmpdir;
        if (osPlat == 'win32') {
            extPath = yield tc.extractZip(`${tmpdir}/${fileName}`);
        }
        else {
            extPath = yield tc.extractTar(`${tmpdir}/${fileName}`);
        }
        return path.join(extPath, osPlat == 'win32' ? 'mage.exe' : 'mage');
    });
}
exports.getMage = getMage;
function getFileName(version) {
    const platform = osPlat == 'win32' ? 'Windows' : osPlat == 'darwin' ? 'macOS' : 'Linux';
    const arch = osArch == 'x64' ? '64bit' : '32bit';
    const ext = osPlat == 'win32' ? 'zip' : 'tar.gz';
    return util.format('mage_%s_%s-%s.%s', version, platform, arch, ext);
}
function determineVersion(version) {
    return __awaiter(this, void 0, void 0, function* () {
        let rest = new restm.RestClient('ghaction-mage', 'https://github.com', undefined, {
            headers: {
                Accept: 'application/json'
            }
        });
        if (version !== 'latest') {
            version = `v${version}`;
        }
        let res = yield rest.get(`/magefile/mage/releases/${version}`);
        if (res.statusCode != 200 || res.result === null) {
            throw new Error(`Cannot find Mage ${version} release (http ${res.statusCode})`);
        }
        return res.result.tag_name.replace(/^v/, '');
    });
}
