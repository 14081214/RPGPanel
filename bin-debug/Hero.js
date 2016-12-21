var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Cache = function (target, propertyKey, desc) {
    var method = desc.value;
    desc.value = function () {
        var cacheKey = "__cache" + propertyKey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this);
        }
        return target[cacheKey];
    };
};
var equipmentType;
(function (equipmentType) {
    equipmentType[equipmentType["AXE"] = 1] = "AXE";
    equipmentType[equipmentType["HELMET"] = 2] = "HELMET";
    equipmentType[equipmentType["BRACELET"] = 3] = "BRACELET";
    equipmentType[equipmentType["ARMOR"] = 4] = "ARMOR";
})(equipmentType || (equipmentType = {}));
var Property = (function () {
    function Property(name, value, isRate) {
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }
    var d = __define,c=Property,p=c.prototype;
    p.getDescription = function () {
        if (this.isRate) {
            return this.name + ": +" + (this.value / 10).toFixed(2) + "%";
        }
        else {
            return this.name + ": +" + this.value;
        }
    };
    return Property;
}());
egret.registerClass(Property,'Property');
var User = (function () {
    function User(name) {
        this.name = "";
        this.level = 1;
        this.exp = 0;
        this.totalExp = 0;
        this.gold = 0;
        this.diamondNum = 0;
        this.__heros = [];
        this.__herosInTeam = [];
        this.name = name;
    }
    var d = __define,c=User,p=c.prototype;
    p.getTotalExp = function () {
        this.totalExp = this.level * 20;
        return this.totalExp;
    };
    p.addHeros = function (hero) {
        this.__heros.push(hero);
    };
    p.addHeroInTeam = function (hero) {
        this.__herosInTeam.push(hero);
    };
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero(name, level, quality, attack, defence, agile, heroPic) {
        this.name = "";
        this.level = 1;
        this.isInTeam = false;
        this.maxHP = 0;
        this.curHP = 0;
        this.totalHP = 0;
        this.quality = 0;
        this.attack = 0;
        this.defence = 0;
        this.agile = 0;
        this.exp = 0;
        this.totalExp = 0;
        this.equipments = [];
        this.properties = [];
        this.name = name;
        this.level = level;
        this.quality = quality;
        this.attack = attack;
        this.defence = defence;
        this.agile = agile;
        this.heroPic = heroPic;
    }
    var d = __define,c=Hero,p=c.prototype;
    p.addEquipment = function (equipment) {
        this.equipments.push(equipment);
    };
    p.getTotalExp = function () {
        this.totalExp = this.level * 20;
        return this.totalExp;
    };
    p.getMaxHP = function () {
        this.properties[0] = new Property("最大生命值", this.level * this.quality * 10, false);
        return this.level * this.quality * 10;
    };
    p.getAttack = function () {
        var result = 0;
        this.equipments.forEach(function (e) { return result += e.attack; });
        result += this.level * this.quality * 50;
        this.properties[1] = new Property("攻击力", result, false);
        return result;
    };
    p.getDefence = function () {
        var result = 0;
        this.equipments.forEach(function (e) { return result += e.defence; });
        result += this.level * this.quality * 30;
        this.properties[2] = new Property("防御力", result, false);
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.equipments.forEach(function (e) { return result += e.agile; });
        result += this.level * this.quality * 40;
        this.properties[3] = new Property("敏捷度", result, false);
        return result;
    };
    p.getFightPower = function () {
        var result = 0;
        this.equipments.forEach(function (e) { return result += e.fightPower; });
        result += this.level * 10 + this.quality * 10 + this.getAttack() * 5 + this.getDefence() * 3 + this.getAglie() * 4;
        this.properties[4] = new Property("战斗力", result, false);
        return result;
    };
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    __decorate([
        Cache
    ], p, "getMaxHP", null);
    __decorate([
        Cache
    ], p, "getAttack", null);
    __decorate([
        Cache
    ], p, "getDefence", null);
    __decorate([
        Cache
    ], p, "getAglie", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(name, lever, equipmenttype, attack, defence, agile, equipPic) {
        this.name = "";
        this.level = 1;
        this.quality = 0;
        this.attack = 0;
        this.defence = 0;
        this.agile = 0;
        this.isWeapon = false;
        this.jewels = [];
        this.properties = [];
        this.name = name;
        this.level = lever;
        this.equipmentType = equipmenttype;
        this.attack = attack;
        this.defence = defence;
        this.agile = agile;
        this.equipPic = equipPic;
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.addJewl = function (jewel) {
        this.jewels.push(jewel);
    };
    p.getAttack = function () {
        var result = 0;
        this.jewels.forEach(function (e) { return result += e.attack; });
        result += this.level * this.quality * 3;
        this.properties[0] = new Property("攻击力", result, false);
        return result;
    };
    p.getDefence = function () {
        var result = 0;
        this.jewels.forEach(function (e) { return result += e.defence; });
        result += this.level * this.quality * 2;
        this.properties[1] = new Property("防御力", result, false);
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.jewels.forEach(function (e) { return result += e.agile; });
        result += this.level * this.quality * 3;
        this.properties[2] = new Property("敏捷度", result, false);
        return result;
    };
    d(p, "fightPower"
        ,function () {
            var result = 0;
            this.jewels.forEach(function (e) { return result += e.fightPower; });
            return result + this.level * 10 + this.quality * 10 + this.getAttack() * 5 + this.getAglie() * 3 + this.quality * 4;
        }
    );
    p.getEquipInfo = function () {
        this.getAttack();
        this.getDefence();
        this.getAglie();
    };
    __decorate([
        Cache
    ], p, "getAttack", null);
    __decorate([
        Cache
    ], p, "getDefence", null);
    __decorate([
        Cache
    ], p, "getAglie", null);
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Jewel = (function () {
    function Jewel(level, attack, defence, agile) {
        this.level = 1;
        this.attack = 0;
        this.defence = 0;
        this.agile = 0;
        this.level = level;
        this.attack = attack;
        this.defence = defence;
        this.agile = agile;
    }
    var d = __define,c=Jewel,p=c.prototype;
    d(p, "fightPower"
        ,function () {
            return this.level * 10 + this.attack * 5 + this.defence * 3 + this.agile * 4;
        }
    );
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
//# sourceMappingURL=Hero.js.map