hashed_scoring_users = do ->
  code = '''
  x4d6417aa7abba27f8e3024aace880e222c8cc0b5f551a571ae0ec90e01cc6b91e9e19e8fa375ac098ea0b261565ed85b5a9897107f8eda71057dfa84ab29550c38cc4930853d0be926d433840b70e3ced6e39f33f9e82cdb8830966d3cfb059b2bcbcbcbe8dba784e57f74efa8ddfb9e7893bbf9168bedab61d0d1605a9247709be7c85833d505ce7b56312cbd0027e176c62694e11105ca7c95a1696ed585634616c07fb20b858e2e94b75ce2a8721ad46728f2027fc4e9209549824ec309b50b5b86dd769b6cc924997837ab8ff79036450e95787a5b2cbdd74af33594c5af147f0c7b48e5c8593ab44064a02cc4f73ffbfbca6f0d9fda5f2283d8e9ac9a1c3374c4b899794d0579428036587cdb6a4f1429846391720e4d8e583fe7abe07c0917df3811c7351ab0aa415e369fa739fa79406c743dfe66a52c1c351b5f8cf66fdfd94ad843dedf0befeb3cb9ebf1ff47a1c47467bf2b3ccecc8134ea9f618c8134bd8e3606f9ecad8010a6a9799052c2b29b522b6a46ec18c028c7c87582e2cf88d3f670b945ecf625c7450bab7d99c72bbc9051e2fcd2d4db95554bbede48dbbf541251414a21e069d56ab9291ce3553559492210399ffd646f17a3cc12713998a2268fc524bb7a8042368c56b4c7f14d79d0703b4ceb1a1a6db730a81348cd0133c3dfbab3e6c1e12d3d03535add458a4872726c1c91f3877c65d7b4480c879229879d75b07476dcbb99e3fa46c3c363a3667d8ab1bd219ef31c4d82959b53dcd1219f460e3ff83df9c9273e5964b8f6dffbf5036644bdd4351a0d75b80d718f0e940ac4a51c59944e82e1da85f754d73c55b1a44f2d7d4a0cdf7f2b71f284499a3385610d9304056e2631593b2e8c23c1450ab6691155bccc98d1b0c2336afb5d097d79003398deabde03aa105f969b271f692e6762f50ea5ec8ff53990e430eb54653ee6542c4ffa6494ee9329106f2137cb8a36ce731442b2be1232e55362c5a2bf0e701450524a6385496df39cf0c657bb3d41fe4d27777360c1900d072020f22a08a63b76ee1aec1c45058b815e93528e6b36cdaa7416238aa8dd30f3bd64b266297245d5871339f354bd9581fdc7378f48116bf7f82d4378c2af2d39279e061e1202552df6b27ed5dfafc8cf7ef5abebe90b832df673bedd9c09a89ba2af177633592a368a1193a6381ebae71e1ba15c423741e19c1789ddd9b85df6239cc707be3ddd06d69bd3113ab62bc5508c666a46e30aa416f8af9c9b99cb89fc45c0be3d2b84d1543fa925b4b7cb5dffb23757b8c78dee7466478b7a56496dfdad8f3158a12e97650e93d8f7887a3f1f0ddbaef8c8e58b9a359617278e88f83b58c0a6e162127a9a490c697fd9347b3d1d9af838020a63a2817189d995f2d0e3584ef700534e51b93a2f56dbb49af6d8fec78a90fccd0629a29746a8370b406dc0e30661da50d5bd945238f0c59b4c7c90b05c2efe75c57353d5dbebaf7552d263ec410a3399b601ff36263b5c718a46190fe9973e302d5c25b45d2729f1ba58fdbdd451d94a691c6d7a2b837ef1c4afe5c8b9f6e7d9b3330e00ed49c01951d4e9a18234369212b3e990af5c3be5e2fbd5797d2ca0a0a6d23d63bdf347e75ff2f768595acbfa0dff0be0ee030e6bbca6383bfb33b352457a9acbecee7494116f3b61eec79f9f884c465940f0e410e612e1b65b8c838efebb4b604358a2cb862548359a0aaa23ca023f2b352b0d5b7016902d374e828a05cf1063807e024a297faba3e3b898850bdec5a52da91b6799d439f14a81ebc06ba317fd0b0b46656c8eb2d9394ee04f46456f38c42801ef716a684c578cdb6359fc17b3814f23e9c4c9564d8eecd8f9200fba65409fdef735e487bc68b658fe3233b298c1d6ceb9160fdf7fdeb9f907c8834a20175d9915c565a1b896304a63faa5875f5b396e8843d54c6afe77d05a09d4fce2d9b1738b7ac877b9fdcc4a1ee5c8c926c1b4fa49d612e1e9bb277f94d7e2a284fdc92939a3d8e48f9327d2db2be88616f4b6bbf142705bb943412848c12af6360d7174fe2959ba6256a383a8637cabe941df656a260a9549773548415257715c488da6f771a23b2b9b19abbae0eb439417f6aa4c4098e7c46c4e09021e0e6c1481ffb0814d5300aace9a04acb1891598af4442d2311536f885756fc1cf25a1ae2b73949e043d6612a74c959fa67d17d9b529894710a25c9819fad0791633cbca596bf8fe0aee9910a769fb0f8876f1bc061a1bf30b758b635cb1da6dbd9241444e9ba9e69125de98c6c541066a1cb4e174a8cb67c8f577b96208906dd37435ece2d6f29b719b9cbe2f924aeead3a603e40a6499d1a26722fa51500b8b45ae8a0806de2b9c1788941077a49d932da84dc923906acba5c4b43441b4a6878dbdc33c9d4a311419fb147342b0c53015fc55d91562fb93d013c06eec1cfbf4dbd5bf74c825feb168a56d480f9d1b9ce574ecbefc326a88a42be19bf8b947af4dc9e1353911e613f0f9b2387888ffeb44bce855b425583c6934786152e474f147949f7a4e4ee21a74220ee2d2e0a8cdcd61c29d0c05d2c7d58636404e17490d81476e4aef954add0b16ee532461bfa57a5aee66e4e73772beda70b6bc67da4b445198b4871ed418e4f866789a73fd7b0c18072c63e3ceebaf7158f48a0b60cc1d8457982e8ff0f77f517a99458adc09a323e87ef49097b8fec5aeeb6c1d47f3347a148ba6665f442bbeed341b82517d1434dcb73bfa9dda2135d94714bf9030b08754bb9e1029c2e34d1c245622c42508e3571ba4b332e9e6dde7510d8e88baa129396095fd58bb64ecfc10284aacfd07bd1910da95c4cbe5223b16f02f06fdc0824acf69fcd2c9dc79063eb6c8945494b224aa67a9d339f4ef09a773de034904c05a5139afba9095484e1c9296406a328bc78e93c865e300e8292239bf18b2db45fc7482ae07c206a0f18d42ad72f2ed1ef56c200573ba693f6ef62eca151585a34f19dff11b737983f7d927367adbb00242b4bb07cb7ff1449ba82bb90422137a27323989fd3f6350c4ca75e056972c70f8702bd1ca091f31eb4e5cc1a075f2c42fb2ecd45e8a90e2b9a958a256bd862bc43771863d6eb473510c888f9afdd073fdb8106978dd86cd564f02fceb401f33cb84d04ed719bf876aade46df552212bb0dca08e206a845aff1292883659be9644ceb8388b1e406b7d245f1ba521700d2092461251418a6486f4c666e813d8d90ae69f268df07a404330f73eca939155568dab8bbbe04058008422c96906f423cdbae18bcf023029d2668b53160ae14898db11973effe82b5aa81f8ea07b770a12208b382b40624d86daf7c17b405015e3a674647bacc3ae5a39d31c2816f8d85b6b57d348128d90f61cc030000c465059c77c96fa64a73f535e91cf08b2037ec97e6ea26e19931a8bf01e85c8caa07f65409e1ede4702fbe59594c7d95dd309c8e59e85684e2baf8804647513dd6f27f088100c787279288a597052ab4e55d59d1707ee1a574a103e1897f6a8b142871605021fbacf91a0ce1dcf719593c77653573d01fe681aab2b7a894bd7f54dd3f4152d78fb419195352f2056988728ac86c8009bb97ac1fea4285f6bd4a911da7e58c84be5a99515ea390e5e9bc57ae56500e7a6f802187ed19b77041df50692c9204e6703aa259cf3ec0e08bec5bbd1150225948361e921126bcf07c7d8fa8caefbfe859d6e857ab4506938eacba453d27ee6c5a521aab657c800669b3511c42a2e3a9ce8f879e2d16385498a06a55b595a2c6ec69f8cd7e28498e5bb7b7ef3aed00425f3f940f13fefd648e7bc82a007503f97c96e3d21e0d466c0e56deb9d72f61feb833ed050bf56cd53dabx72493987dfd63a84370a3710c29dc41bc38689ce84f7fe103a55066e13136c3917ae1027b63b409215c1f99f02c5c9f6ef845b8bf4ca88238b877b84e4c9696fc6f003ff648f815ax07022402634e109b9a57148a57030d92f8441d7ed5b4453ba76230c479705e5335ddfa1fef6d5286efd642d51286c15f762d2139e3733fa74c2b79ccc2ccc0abcb39b5e576aff09bd78acb55fa5c774c41186a16e72db97eee756a05b70fea0582c19289818834862e30612dfe03ebe18712657cbc6837306c6e4562cb7b074fb326b3e94359fd02790c4e6faed1abc29486cc28188f1ec8d4d6ede586fff303a167c90a6a32007286cb8d7dca8e399bdccc02d4082c86803b4e90c5b82f4658b571d7ae72c17890x5a3918717352c3837ff1c7021b21926bac67329100d49f6fe60e8c01dc6e24c661d62948e8e26d5ea1180c9c6a75dfb1a5a96be43f58127d8d1ce438x2938d3c1a99e829e76b3e8113eb3218619385f8e678c42d5b5bc0db68738e479xdb7798bad5aef57ffac8ad40cbd31e815ff8597b7647f6be822417a3b5fd1223d89b0b0bxx09b7ad304560d9394a059539ff592ee83273819fa32e12d1f10911ff57cc4d36e30b8a06a8fad4a429a7d7673976070bx61f141ef61ff32a92cb0cff147844d4871824afc5c5e7180
  '''
  h = {}
  code.split('x').forEach (hashes, score) ->
    score = (score + 1) / 2.0
    h[hash] = score for hash in (hashes.match(/.{8}/g) || [])
    return
  h

update_score = (score) ->
  $('#friends-score i').each ->
    star_class = if score >= 1
      score -= 1
      ''
    else if score >= 0.5
      score -= 0.5
      '-half-o'
    else
      score = 0
      '-o'
    $(this).attr(
      'class'
      "fa fa-star#{star_class}"
    )
    return
  return

crc32 = do ->
  table = '0000000077073096EE0E612C990951BA076DC419706AF48FE963A5359E6495A30EDB883279DCB8A4E0D5E91E97D2D98809B64C2B7EB17CBDE7B82D0790BF1D911DB710646AB020F2F3B9714884BE41DE1ADAD47D6DDDE4EBF4D4B55183D385C7136C9856646BA8C0FD62F97A8A65C9EC14015C4F63066CD9FA0F3D638D080DF53B6E20C84C69105ED56041E4A26771723C03E4D14B04D447D20D85FDA50AB56B35B5A8FA42B2986CDBBBC9D6ACBCF94032D86CE345DF5C75DCD60DCFABD13D5926D930AC51DE003AC8D75180BFD0611621B4F4B556B3C423CFBA9599B8BDA50F2802B89E5F058808C60CD9B2B10BE9242F6F7C8758684C11C1611DABB6662D3D76DC419001DB710698D220BCEFD5102A71B1858906B6B51F9FBFE4A5E8B8D4337807C9A20F00F9349609A88EE10E98187F6A0DBB086D3D2D91646C97E6635C016B6B51F41C6C6162856530D8F262004E6C0695ED1B01A57B8208F4C1F50FC45765B0D9C612B7E9508BBEB8EAFCB9887C62DD1DDF15DA2D498CD37CF3FBD44C654DB261583AB551CEA3BC0074D4BB30E24ADFA5413DD895D7A4D1C46DD3D6F4FB4369E96A346ED9FCAD678846DA60B8D044042D7333031DE5AA0A4C5FDD0D7CC95005713C270241AABE0B1010C90C20865768B525206F85B3B966D409CE61E49F5EDEF90E29D9C998B0D09822C7D7A8B459B33D172EB40D81B7BD5C3BC0BA6CADEDB883209ABFB3B603B6E20C74B1D29AEAD547399DD277AF04DB261573DC1683E3630B1294643B840D6D6A3E7A6A5AA8E40ECF0B9309FF9D0A00AE277D079EB1F00F93448708A3D21E01F2686906C2FEF762575D806567CB196C36716E6B06E7FED41B7689D32BE010DA7A5A67DD4ACCF9B9DF6F8EBEEFF917B7BE4360B08ED5D6D6A3E8A1D1937E38D8C2C44FDFF252D1BB67F1A6BC57673FB506DD48B2364BD80D2BDAAF0A1B4C36034AF641047A60DF60EFC3A867DF55316E8EEF4669BE79CB61B38CBC66831A256FD2A05268E236CC0C7795BB0B4703220216B95505262FC5BA3BBEB2BD0B282BB45A925CB36A04C2D7FFA7B5D0CF312CD99E8B5BDEAE1D9B64C2B0EC63F226756AA39C026D930A9C0906A9EB0E363F720767850500571395BF4A82E2B87A147BB12BAE0CB61B3892D28E9BE5D5BE0D7CDCEFB70BDBDF2186D3D2D4F1D4E24268DDB3F81FDA836E81BE16CDF6B9265B6FB077E118B7477788085AE6FF0F6A7066063BCA11010B5C8F659EFFF862AE69616BFFD3166CCF45A00AE278D70DD2EE4E0483543903B3C2A7672661D06016F74969474D3E6E77DBAED16A4AD9D65ADC40DF0B6637D83BF0A9BCAE53DEBB9EC547B2CF7F30B5FFE9BDBDF21CCABAC28A53B3933024B4A3A6BAD03605CDD7069354DE572923D967BFB3667A2EC4614AB85D681B022A6F2B94B40BBE37C30C8EA15A05DF1B2D02EF8D'.match(/.{8}/g).map (v) -> parseInt(v, 16);
  (str) ->
    crc = 0 ^ (-1)
    crc = (crc >>> 8) ^ table[(crc ^ str.charCodeAt(i)) & 0xff] for i in [0...str.length] by 1
    (crc ^ (-1)) >>> 0

$('#screen-name').on 'input', ->
  name = $.trim($(this).val()).replace(/^@/, '')
  hash = "00000000#{crc32(name).toString(16)}".slice(-8)
  update_score(hashed_scoring_users[hash] || 0)
  return
