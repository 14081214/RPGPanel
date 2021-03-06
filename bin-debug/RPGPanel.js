var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel() {
        var _this = this;
        _super.call(this);
        this.width = 640;
        this.height = 1136;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, this.width, this.height);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        this.heroInfoText = "";
        this.heroText = new egret.TextField();
        this.heroText.width = 400;
        this.heroText.height = 100;
        this.addChild(this.heroText);
        this.heroText.x = 100;
        this.heroText.y = 800;
        this.heroText.size = 20;
        this.heroPicture = new egret.Bitmap();
        this.heroPicture.width = 350;
        this.heroPicture.height = 500;
        this.addChild(this.heroPicture);
        this.heroPicture.x = 100;
        this.heroPicture.y = 200;
        this.axeIcon = new egret.Bitmap();
        this.axeIcon.width = 80;
        this.axeIcon.height = 80;
        this.addChild(this.axeIcon);
        this.axeIcon.x = this.width * 7 / 9;
        this.axeIcon.y = this.height / 8;
        this.axeIcon.touchEnabled = true;
        this.axeIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.equipments[0].getEquipInfo();
            _this.equipPanel.printfEquip(_this.hero.equipments[0]);
            _this.equipPanel.alpha = 1;
        }, this);
        this.helmetIcon = new egret.Bitmap();
        this.helmetIcon.width = 80;
        this.helmetIcon.height = 80;
        this.addChild(this.helmetIcon);
        this.helmetIcon.x = this.width * 7 / 9;
        this.helmetIcon.y = this.axeIcon.y + this.height / 6;
        this.helmetIcon.touchEnabled = true;
        this.helmetIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.equipments[1].getEquipInfo();
            _this.equipPanel.printfEquip(_this.hero.equipments[1]);
            _this.equipPanel.alpha = 1;
        }, this);
        this.braceletIcon = new egret.Bitmap();
        this.braceletIcon.width = 80;
        this.braceletIcon.height = 80;
        this.addChild(this.braceletIcon);
        this.braceletIcon.x = this.width * 7 / 9;
        this.braceletIcon.y = this.helmetIcon.y + this.height / 7;
        this.braceletIcon.touchEnabled = true;
        this.braceletIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.equipments[2].getEquipInfo();
            _this.equipPanel.printfEquip(_this.hero.equipments[2]);
            _this.equipPanel.alpha = 1;
        }, this);
        this.armorIcon = new egret.Bitmap();
        this.armorIcon.width = 80;
        this.armorIcon.height = 80;
        this.addChild(this.armorIcon);
        this.armorIcon.x = this.width * 7 / 9;
        this.armorIcon.y = this.braceletIcon.y + this.height / 6;
        this.armorIcon.touchEnabled = true;
        this.armorIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.equipments[3].getEquipInfo();
            _this.equipPanel.printfEquip(_this.hero.equipments[3]);
            _this.equipPanel.alpha = 1;
        }, this);
        this.equipPanel = new EquipPanel();
        this.addChild(this.equipPanel);
        this.equipPanel.x = 350;
        this.equipPanel.y = 600;
        this.equipPanel.alpha = 0;
    }
    var d = __define,c=UserPanel,p=c.prototype;
    p.printfHero = function (hero) {
        this.hero = hero;
        this.getHeroInfo(hero);
        this.heroPicture.texture = RES.getRes(hero.heroPic);
        this.axeIcon.texture = RES.getRes(hero.equipments[0].equipPic);
        this.helmetIcon.texture = RES.getRes(hero.equipments[1].equipPic);
        this.braceletIcon.texture = RES.getRes(hero.equipments[2].equipPic);
        this.armorIcon.texture = RES.getRes(hero.equipments[3].equipPic);
        //this.heroText.text = this.heroInfoText;
    };
    p.getHeroInfo = function (hero) {
        this.heroInfoText = "";
        this.heroInfoText = "英雄 : " + hero.name + "\n";
        hero.getDefence();
        hero.getAttack();
        hero.getMaxHP();
        hero.getAglie();
        for (var i = 0; i < hero.properties.length; i++) {
            this.heroInfoText = this.heroInfoText + hero.properties[i].name + " : " + hero.properties[i].value.toFixed(0) + "\n";
        }
        this.heroText.text = this.heroInfoText;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return UserPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(UserPanel,'UserPanel');
var EquipPanel = (function (_super) {
    __extends(EquipPanel, _super);
    function EquipPanel() {
        _super.call(this);
        this.width = 250;
        this.height = 400;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, this.width / 2, 300);
        topMask.graphics.endFill();
        topMask.x = 0;
        topMask.y = 30;
        this.addChild(topMask);
        this.equipIcon = new egret.Bitmap();
        this.equipIcon.width = 60;
        this.equipIcon.height = 60;
        this.addChild(this.equipIcon);
        this.equipIcon.x = 30;
        this.equipIcon.y = 30;
        this.nameText = new egret.TextField();
        this.nameText.width = 200;
        this.nameText.height = 50;
        this.addChild(this.nameText);
        this.nameText.size = 24;
        this.nameText.x = 30;
        this.nameText.y = this.equipIcon.y + this.equipIcon.height + 50;
        this.propertiesField = new egret.TextField();
        this.propertiesField.width = 200;
        this.propertiesField.height = 300;
        this.addChild(this.propertiesField);
        this.propertiesField.textColor = 0xffffff;
        this.propertiesField.size = 20;
        this.propertiesField.x = 30;
        this.propertiesField.y = this.nameText.y + 55;
    }
    var d = __define,c=EquipPanel,p=c.prototype;
    p.printfEquip = function (equipment) {
        this.nameText.text = equipment.name;
        this.equipIcon.texture = RES.getRes(equipment.equipPic);
        var information = "";
        for (var i = 0; i < equipment.properties.length; i++) {
            information = information + equipment.properties[i].name + " : " + equipment.properties[i].value.toFixed(0) + "\n" + "\n";
        }
        this.propertiesField.text = information;
    };
    return EquipPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(EquipPanel,'EquipPanel');
//# sourceMappingURL=RPGPanel.js.map