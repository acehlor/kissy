describe("modules and packages", function () {

    var S = KISSY;

    it("can get base correctly", function () {
        expect(KISSY.config("base"))
            .toBe(new S.Uri(location.href)
            .resolve("../../../../build/").toString());
    });

    it("does not depend on order", function () {

        KISSY.config({
            map:[
                [/\?t=.+$/, ""]
            ],
            "modules":{
                "x/x":{
                    requires:['x/y']
                }
            }
        });

        KISSY.config("packages", {
            x:{
                base:"../specs/packages-modules"
            }
        });

        var ret;

        KISSY.use("x/x", function (S, X) {
            expect(X).toBe(8);
            ret = X;
        });

        waitsFor(function () {
            return ret == 8;
        }, 5000);

        runs(function(){
            S.config("map").length=0;
        });

    });

    it("package can has same path", function () {
        var combine = KISSY.config("combine");
        var ret = 0;
        KISSY.config({
            map:[
                [/\?t=.+$/, ""]
            ],
            packages:{
                y:{
                    base:"../specs/packages-modules"
                },
                z:{
                    base:"../specs/packages-modules"
                }
            }
        });

        KISSY.use("y/y,z/z", function (S, y, z) {
            expect(y).toBe(2);
            expect(z).toBe(1);
            ret = 1;
        });

        waitsFor(function () {
            return ret;
        });

        runs(function () {
            S.config("map").length=0;
        })

    });

});