export const MONSTER_OPTIONS = {

    monsters: [
        {
            cellName: "Bandit Chief",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://www.kryxrpg.com/static/a5ef4a2187298abc4de31ba3f0fca6c7/5aa84/bandit.avif"
        }, {
            cellName: "Bandit",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1039964412703952976/My_project_2.png"
        }, {
            cellName: "Berserker",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1039961944397975652/berserker_main.png"
        }, {
            cellName: "Thief Cat",
            cellSize: "medium",
            cellShape: "round",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1067440767020322866/pngegg_41.png"
        }, {
            cellName: "Beholder",
            cellSize: "large",
            cellShape: "round",
            cellUrl: "https://www.kryxrpg.com/static/b5bfe3f8f12161cc1a1d23eb5341538b/49e7e/beholder.avif"
        }, {
            cellName: "Abominable Yeti",
            cellSize: "huge",
            cellShape: "tall",
            cellUrl: "https://www.kryxrpg.com/static/3110afcfe7d9cd419f79494cd4858067/997b7/abominable-yeti.avif"
        }, {
            cellName: "Fat Assasin",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1042437552717701140/pngwing.com.png"
        }, {
            cellName: "Brew Witch",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1050851179745263687/My_project_16.png"
        }
    ],
    addMonster: (name, size, url) => {
        MONSTER_OPTIONS.monsters.push(
            {
                cellName: name,
                cellSize: size,
                cellShape: "tall",
                cellUrl: url
            }
        )
    },
    changeShape: (name, shape) => {
        const monsterForShapeChange = MONSTER_OPTIONS.monsters.find((monster) => monster.cellName === name);
        if (monsterForShapeChange) {
            monsterForShapeChange.cellShape = "shape";
        }
    },
    monsterUrls: {
        "Aarakocra":"https://www.kryxrpg.com/static/0fc9f4ba937fc2a75bf7fca6ddab909e/5e9bf/aarakocra.avif",
        "Aboleth":"https://www.kryxrpg.com/static/38d778fdf032e705851d2a86b2a9d906/8be70/aboleth.avif",
        "Abominable Yeti": "https://www.kryxrpg.com/static/3110afcfe7d9cd419f79494cd4858067/997b7/abominable-yeti.avif",
        "Acolyte":"https://www.kryxrpg.com/static/5cfb4139ddac84be96aabdf51f0edbec/ce353/acolyte.avif",
        "Adult Black Dragon":"https://www.kryxrpg.com/static/bd003e15e795fc9a04391f0060523248/c6f94/adult-black-dragon.avif",
        "Ancient Black Dragon": "https://www.kryxrpg.com/static/bd003e15e795fc9a04391f0060523248/c6f94/adult-black-dragon.avif",
        "Adult Blue Dracolich": "https://www.kryxrpg.com/static/4839410ce1c1099b71deafffe5cd65df/d5691/adult-blue-dracolich.avif",
        "Ancient Blue Dracolich":"https://www.kryxrpg.com/static/4839410ce1c1099b71deafffe5cd65df/d5691/adult-blue-dracolich.avif",
        "Adult Blue Dragon":"https://www.kryxrpg.com/static/66129cb4244628443c9d6182da3b5aec/9efce/adult-blue-dragon.avif",
        "Ancient Blue Dragon": "https://www.kryxrpg.com/static/66129cb4244628443c9d6182da3b5aec/9efce/adult-blue-dragon.avif",
        "Adult Brass Dragon": "https://www.kryxrpg.com/static/7f8349930fbef3a608371dddb670542d/1f8ee/adult-brass-dragon.avif",
        "Ancient Brass Dragon":"https://www.kryxrpg.com/static/7f8349930fbef3a608371dddb670542d/1f8ee/adult-brass-dragon.avif",
        "Adult Bronze Dragon": "https://www.kryxrpg.com/static/e963432330de739a1eb348e235ebf596/d10d0/adult-bronze-dragon.avif",
        "Ancient Bronze Dragon":"https://www.kryxrpg.com/static/e963432330de739a1eb348e235ebf596/d10d0/adult-bronze-dragon.avif",
        "Adult Copper Dragon": "https://www.kryxrpg.com/static/fdec16407f665cbd4c79e59456351acc/a2fda/adult-copper-dragon.avif",
        "Ancient Copper Dragon":"https://www.kryxrpg.com/static/fdec16407f665cbd4c79e59456351acc/a2fda/adult-copper-dragon.avif",
        "Adult Gold Dragon":"https://www.kryxrpg.com/static/70c790fba01445da9215134f704c6263/958ee/adult-gold-dragon.avif",
        "Ancient Gold Dragon":"https://www.kryxrpg.com/static/70c790fba01445da9215134f704c6263/958ee/adult-gold-dragon.avif",
        "Adult Green Dragon":"https://www.kryxrpg.com/static/902c85fccb25ff159d3bf23749bae1ed/f321e/adult-green-dragon.avif",
        "Ancient Green Dragon":"https://www.kryxrpg.com/static/902c85fccb25ff159d3bf23749bae1ed/f321e/adult-green-dragon.avif",
        "Adult Kruthik":"https://www.kryxrpg.com/static/c863e97023a22cb343bec8ddb086b664/5ae29/adult-kruthik.avif",
        "Adult Oblex":"https://www.kryxrpg.com/static/e62d46a5f33b731571a4eef48d27de45/9d2b9/adult-oblex.avif",
        "Adult Red Dragon":"https://www.kryxrpg.com/static/5525451af381ca3e76050df1ab6b8ea4/68233/adult-red-dragon.avif",
        "Ancient Red Dragon":"https://www.kryxrpg.com/static/5525451af381ca3e76050df1ab6b8ea4/68233/adult-red-dragon.avif",
        "Adult Silver Dragon":"https://www.kryxrpg.com/static/209eb05e8efb7cd1ddf6614a3af4c899/68ab6/adult-silver-dragon.avif",
        "Ancient Silver Dragon":"https://www.kryxrpg.com/static/209eb05e8efb7cd1ddf6614a3af4c899/68ab6/adult-silver-dragon.avif",
        "Adult White Dragon":"https://www.kryxrpg.com/static/f7e79570855a8bde30786cae492eec7c/96eb4/adult-white-dragon.avif",
        "Ancient White Dragon":"https://www.kryxrpg.com/static/f7e79570855a8bde30786cae492eec7c/96eb4/adult-white-dragon.avif",
        "Air Elemental Myrmidon":"https://www.kryxrpg.com/static/614a9bae4e51a6d02d055a752649ab51/3e84b/air-elemental-myrmidon.avif",
        "Alhoon":"https://www.kryxrpg.com/static/eb2419f48f8915bc020bb4a254f87395/53bdc/alhoon.avif",
        "Alkilith":"https://www.kryxrpg.com/static/810cf329efeac0b0229948a86d5dc280/a4fdd/alkilith.avif",
        "Allip":"https://www.kryxrpg.com/static/ae1b5db148b4d9923382f7ce4d1d9520/8005c/allip.avif",
        "Allosaurus":"https://www.kryxrpg.com/static/10641539099264866f1ad0ad38c752e3/101f2/allosaurus.avif",
        "Almiraj":"https://www.kryxrpg.com/static/6d86540ec9a2af3f7af7732b960a5f95/357d6/almiraj.avif",
        "Amnizu":"https://www.kryxrpg.com/static/b5c37ac154dead1da350c731d779eee7/39ddd/amnizu.avif",
        "Androsphinx":"https://www.kryxrpg.com/static/d6cdf63a61be0097c05d1856aa04cd21/c70dd/androsphinx.avif",
        "Animated Armor":"https://www.kryxrpg.com/static/811cbcfbd7a19af95707d15de8dfbd83/c396d/animated-armor.avif",
        "Ankheg":"https://www.kryxrpg.com/static/70bbf720a9efc41e64d4c7c2180ece4b/d0137/ankheg.avif",
        "Ankylosaurus":"https://www.kryxrpg.com/static/1b3e7794bebcf5adf0efdbb8c8c586ef/20b9e/ankylosaurus.avif",
        "Annis Hag":"https://www.kryxrpg.com/static/74e868ee50be2b76df73316ce3c75280/50bdb/annis-hag.avif",
        "Ape":"https://www.kryxrpg.com/static/cb41d52db42d6081d5af1ced46bd2608/0e6c8/ape.avif",
        "Arcanaloth":"https://www.kryxrpg.com/static/7ff1a1636406435b1d47c7390aec0cc5/2a83d/arcanaloth.avif",
        "Archer":"https://www.kryxrpg.com/static/cd34ba0e71eacac73df5dd33f35edc3d/d0137/archer.avif",
        "Archmage":"https://www.kryxrpg.com/static/b02d20bca0846020ab9bb47e5dbef624/d4eb5/archmage.avif",
        "Armanite":"https://www.kryxrpg.com/static/4dab548da6fb05b6e1b7b8bab5228a6f/5621c/armanite.avif",
        "Astral Dreadnought":"https://www.kryxrpg.com/static/71c278ac540b69d32e623495e58f2a9d/f70ae/astral-dreadnought.avif",
        "Aurochs":"https://www.kryxrpg.com/static/7972d61fdbb8ed00838b7eae9669838d/46130/aurochs.avif",
        "Autumn Eladrin":"https://www.kryxrpg.com/static/3fe49e84f3e3e7ebe89683fde9829267/2259d/autumn-eladrin.avif",
        "Azer":"https://www.kryxrpg.com/static/d00bda8755d53c2c542f4231a05ee58c/a5e13/azer.avif",
        "Babau":"https://www.kryxrpg.com/static/1478d6c98b041fc1d31ba41fd660687a/bdd0d/babau.avif",
        "Badger":"https://www.kryxrpg.com/static/04f78642c5fe4a6efd00d7f6d7975f97/eb1fc/badger.avif",
        "Bael":"https://www.kryxrpg.com/static/05ef2f2c1e1ae23b0add26e07fbe5ba3/621df/bael.avif",
        "Balhannoth":"https://www.kryxrpg.com/static/eea67836ea656adeb60e547b728661bc/09558/balhannoth.avif",
        "Balor":"https://www.kryxrpg.com/static/00e8a3c3f0378b3cdd915144f7573ea1/ed76b/balor.avif",
        "Banderhobb":"https://www.kryxrpg.com/static/23353f149d0c287120760a1511cdbcfd/94cf5/banderhobb.avif",
        "Bandit":"https://www.kryxrpg.com/static/a5ef4a2187298abc4de31ba3f0fca6c7/5aa84/bandit.avif",
        "Bandit Captain":"https://www.kryxrpg.com/static/a5ef4a2187298abc4de31ba3f0fca6c7/5aa84/bandit.avif",
        "Banshee":"https://www.kryxrpg.com/static/eb1e5746e924db637a14313336758b80/37b11/banshee.avif",
        "Baphomet":"https://www.kryxrpg.com/static/487d8eeba55e019cf228e262e9b12bfd/e4729/baphomet.avif",
        "Barbed Devil":"https://www.kryxrpg.com/static/b56100597f67fba4b676abf3742e2540/b69f5/barbazu.avif",
        "Barghest":"https://www.kryxrpg.com/static/6ebfe03a3c9588f2e02d7e5ac89ce8e0/a251b/barghest.avif",
        "Barlgura":"https://www.kryxrpg.com/static/7837683883742e860eeefb3d39278d83/8be70/barlgura.avif",
        "Basilisk":"https://www.kryxrpg.com/static/1273915eafe3a93a85101a961d85b01f/4ae3d/basilisk.avif",
        "Behir":"https://www.kryxrpg.com/static/1799ceda734a42f4218251305e52985f/a8ce1/behir.avif",
        "Beholder":"https://www.kryxrpg.com/static/b5bfe3f8f12161cc1a1d23eb5341538b/49e7e/beholder.avif",
        "Beholder Zombie":"https://www.kryxrpg.com/static/c4c3853a7555d2ae70d17235191c3b4e/14700/beholder-zombie.avif",
        "Berbalang":"https://www.kryxrpg.com/static/63dd1f678ff73dfe8c425f595ee40331/d10d0/berbalang.avif",
        "Bheur Hag":"https://www.kryxrpg.com/static/e6ed0e8e6373854c6546c0c89a1d2fab/e2f86/bheur-hag.avif",
        "Black Abishai":"https://www.kryxrpg.com/static/5636b7ee8d1c2bdf5a602fe12a66826c/a0200/black-abishai.avif",
        "Black Bear":"https://www.kryxrpg.com/static/0848d4842336a44a883f4174ea9d426d/97df6/black-bear.avif",
        "Black Dragon Wyrmling":"https://www.kryxrpg.com/static/357ee9d39f045f3452a55ebf7cd2f6db/b3e15/black-dragon-wyrmling.avif",
        "Black Greatwyrm":"https://www.kryxrpg.com/static/bd003e15e795fc9a04391f0060523248/c6f94/black-greatwyrm.avif",
        "Black Pudding":"https://www.kryxrpg.com/static/db95e96c4f247596681844c1c50a50d7/a5272/black-pudding.avif",
        "Blink Dog":"https://www.kryxrpg.com/static/e43c242af4d76ec06f8c3ccd887d7ed6/b95d1/blink-dog.avif",
        "Blood Hawk":"https://www.kryxrpg.com/static/df7424a5cf95b0a651edbc0704c393ac/4ca3d/blood-hawk.avif",
        "Blood Ooze":"https://www.kryxrpg.com/static/4454dd1202bfc71d9a11126a5ec82005/c8f56/blood-ooze.avif",
        "Blue Abishai":"https://www.kryxrpg.com/static/c41c84fba2fa4a5851b2fc2ca8738b88/0c071/blue-abishai.avif",
        "Blue Dragon Wyrmling":"https://www.kryxrpg.com/static/66129cb4244628443c9d6182da3b5aec/9efce/adult-blue-dragon.avif",
        "Blue Greatwyrm":"https://www.kryxrpg.com/static/66129cb4244628443c9d6182da3b5aec/9efce/blue-greatwyrm.avif",
        "Blue Slaad":"https://www.kryxrpg.com/static/affbb3be603d3974bf980a00ff360e55/e3077/blue-slaad.avif",
        "Boar":"https://www.kryxrpg.com/static/5d2db48c08dcc4bedce022dbef168f81/c2274/boar.avif",
        "Bodak":"https://www.kryxrpg.com/static/46529ec31f7aa903c02c7042a05089a8/2eebe/bodak.avif",
        "Boggle":"https://www.kryxrpg.com/static/3a36b41851f5a6f22b5269bf5795b18d/eaaff/boggle.avif",
        "Bone Naga":"https://www.kryxrpg.com/static/a81c303bf76507a873ae978fe70f8f51/7bbad/bone-naga-guardian.avif",
        "Boneclaw":"https://www.kryxrpg.com/static/13bdab8638edf656bc526ee78af26b5e/1f519/boneclaw.avif",
        "Brass Dragon Wyrmling":"https://www.kryxrpg.com/static/94b09ea975ef91f078503f4adf5faf76/766f5/brass-dragon-wyrmling.avif",
        "Brass Greatwyrm":"https://www.kryxrpg.com/static/7f8349930fbef3a608371dddb670542d/1f8ee/brass-greatwyrm.avif",
        "Brontosaurus":"https://www.kryxrpg.com/static/329ee7acd4f347835d0fe81c746f4c39/1af86/brontosaurus.avif",
        "Bronze Dragon Wyrmling":"https://www.kryxrpg.com/static/94b09ea975ef91f078503f4adf5faf76/766f5/bronze-dragon-wyrmling.avif",
        "Bronze Greatwyrm":"https://www.kryxrpg.com/static/e963432330de739a1eb348e235ebf596/d10d0/bronze-greatwyrm.avif",
        "Bronze Scout":"https://www.kryxrpg.com/static/68b3cde48e5ad3e1897e779efe474f1d/03bd3/bronze-scout.avif",
        "Bugbear":"https://www.kryxrpg.com/static/5be728a99c713cb6839ab5e74923f10c/b6e0d/bugbear.avif",
        "Bulette":"https://www.kryxrpg.com/static/bfda8814fbf481ed6ecec9ee48c2c945/b8b8a/bulette.avif",
        "Bulezau":"https://www.kryxrpg.com/static/7debc7b0f5b3dba55b025b6cca03d90e/8eee3/bulezau.avif",
        "Bullywug":"https://www.kryxrpg.com/static/5771912a1a8b0bd2c707e2968993464c/561f8/bullywug.avif",
        "Cadaver Collector":"https://www.kryxrpg.com/static/a572ffc78415782e10189f01aa02dc99/0fc26/cadaver-collector.avif",
        "Cambion":"https://www.kryxrpg.com/static/a6bbb8db3c26be4b4750c3118a7b451a/f5cf1/cambion-demon.avif",
        "Camel":"https://www.kryxrpg.com/static/674863252c7330157ffbfaeafa8f499f/e2cd4/camel.avif",




    }
};