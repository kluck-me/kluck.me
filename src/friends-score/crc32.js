/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const crc32 = (function () {
  const table =
    '0000000077073096EE0E612C990951BA076DC419706AF48FE963A5359E6495A30EDB883279DCB8A4E0D5E91E97D2D98809B64C2B7EB17CBDE7B82D0790BF1D911DB710646AB020F2F3B9714884BE41DE1ADAD47D6DDDE4EBF4D4B55183D385C7136C9856646BA8C0FD62F97A8A65C9EC14015C4F63066CD9FA0F3D638D080DF53B6E20C84C69105ED56041E4A26771723C03E4D14B04D447D20D85FDA50AB56B35B5A8FA42B2986CDBBBC9D6ACBCF94032D86CE345DF5C75DCD60DCFABD13D5926D930AC51DE003AC8D75180BFD0611621B4F4B556B3C423CFBA9599B8BDA50F2802B89E5F058808C60CD9B2B10BE9242F6F7C8758684C11C1611DABB6662D3D76DC419001DB710698D220BCEFD5102A71B1858906B6B51F9FBFE4A5E8B8D4337807C9A20F00F9349609A88EE10E98187F6A0DBB086D3D2D91646C97E6635C016B6B51F41C6C6162856530D8F262004E6C0695ED1B01A57B8208F4C1F50FC45765B0D9C612B7E9508BBEB8EAFCB9887C62DD1DDF15DA2D498CD37CF3FBD44C654DB261583AB551CEA3BC0074D4BB30E24ADFA5413DD895D7A4D1C46DD3D6F4FB4369E96A346ED9FCAD678846DA60B8D044042D7333031DE5AA0A4C5FDD0D7CC95005713C270241AABE0B1010C90C20865768B525206F85B3B966D409CE61E49F5EDEF90E29D9C998B0D09822C7D7A8B459B33D172EB40D81B7BD5C3BC0BA6CADEDB883209ABFB3B603B6E20C74B1D29AEAD547399DD277AF04DB261573DC1683E3630B1294643B840D6D6A3E7A6A5AA8E40ECF0B9309FF9D0A00AE277D079EB1F00F93448708A3D21E01F2686906C2FEF762575D806567CB196C36716E6B06E7FED41B7689D32BE010DA7A5A67DD4ACCF9B9DF6F8EBEEFF917B7BE4360B08ED5D6D6A3E8A1D1937E38D8C2C44FDFF252D1BB67F1A6BC57673FB506DD48B2364BD80D2BDAAF0A1B4C36034AF641047A60DF60EFC3A867DF55316E8EEF4669BE79CB61B38CBC66831A256FD2A05268E236CC0C7795BB0B4703220216B95505262FC5BA3BBEB2BD0B282BB45A925CB36A04C2D7FFA7B5D0CF312CD99E8B5BDEAE1D9B64C2B0EC63F226756AA39C026D930A9C0906A9EB0E363F720767850500571395BF4A82E2B87A147BB12BAE0CB61B3892D28E9BE5D5BE0D7CDCEFB70BDBDF2186D3D2D4F1D4E24268DDB3F81FDA836E81BE16CDF6B9265B6FB077E118B7477788085AE6FF0F6A7066063BCA11010B5C8F659EFFF862AE69616BFFD3166CCF45A00AE278D70DD2EE4E0483543903B3C2A7672661D06016F74969474D3E6E77DBAED16A4AD9D65ADC40DF0B6637D83BF0A9BCAE53DEBB9EC547B2CF7F30B5FFE9BDBDF21CCABAC28A53B3933024B4A3A6BAD03605CDD7069354DE572923D967BFB3667A2EC4614AB85D681B022A6F2B94B40BBE37C30C8EA15A05DF1B2D02EF8D'
      .match(/.{8}/g)
      .map((v) => parseInt(v, 16));
  return function (str) {
    let crc = 0 ^ -1;
    for (let i = 0, end = str.length; i < end; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ str.charCodeAt(i)) & 0xff];
    }
    return (crc ^ -1) >>> 0;
  };
})();

module.exports = crc32;
