// node --experimental-strip-types lib/phone.check.ts
import assert from "node:assert";
import { splitPhone } from "./phone.ts";

assert.deepStrictEqual(splitPhone("+94743945010"), { phone: "743945010", country_code: "+94" });
assert.deepStrictEqual(splitPhone("+447911123456"), { phone: "7911123456", country_code: "+44" });
assert.deepStrictEqual(splitPhone(""), { phone: "", country_code: "" });
assert.deepStrictEqual(splitPhone("not a number"), { phone: "not a number", country_code: "" });

console.log("ok");
