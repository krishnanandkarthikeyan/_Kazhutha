function Ub({
    standalone: t = !1
}) {
    let e = async payload => ["stats","save"].includes(payload.op) ? Promise.resolve(D2(payload)) : window.KazhuthaNetwork.request(payload),
        n = "",
        [a, i] = (0, Ne.useState)("English"),
        [r, s] = (0, Ne.useState)(""),
        [o, l] = (0, Ne.useState)("menu"),
        [u, f] = (0, Ne.useState)(4),
        [d, c] = (0, Ne.useState)("Play against AI"),
        [p, g] = (0, Ne.useState)(1),
        [y, m] = (0, Ne.useState)(["", "", "", "", "", ""]),
        [h, x] = (0, Ne.useState)("Medium"),
        [_, v] = (0, Ne.useState)("Classic Kerala"),
        [b, w] = (0, Ne.useState)({
            ...Lc,
            name: "Custom Family Rules"
        }),
        [L, S] = (0, Ne.useState)("Kerala Home"),
        [A, E] = (0, Ne.useState)("First Person"),
        [I, D] = (0, Ne.useState)(!1),
        [O, P] = (0, Ne.useState)(null),
        [H, q] = (0, Ne.useState)(null),
        [F, Z] = (0, Ne.useState)(""),
        [W, G] = (0, Ne.useState)("Suit"),
        [ae, ge] = (0, Ne.useState)([]),
        [me, Ke] = (0, Ne.useState)(!1),
        [Ee, Ye] = (0, Ne.useState)(!1),
        [$, J] = (0, Ne.useState)(null),
        [oe, xe] = (0, Ne.useState)(""),
        [ue, Re] = (0, Ne.useState)(!0),
        [tt, Qe] = (0, Ne.useState)("Off"),
        [at, de] = (0, Ne.useState)(0),
        [Pe, Ve] = (0, Ne.useState)("Relaxed"),
        [we, dt] = (0, Ne.useState)({
            Master: 60,
            Cards: 65,
            Ambience: 15,
            Music: 0,
            Voices: 0
        }),
        [nt, ht] = (0, Ne.useState)(!1),
        [B, Lt] = (0, Ne.useState)([]),
        [Rt, R] = (0, Ne.useState)([]),
        [M, N] = (0, Ne.useState)(!1),
        [k, K] = (0, Ne.useState)(""),
        [ie, fe] = (0, Ne.useState)(0),
        [ee, te] = (0, Ne.useState)(""),
        [re, Ze] = (0, Ne.useState)(null),
        [Se, ye] = (0, Ne.useState)(null),
        [Ge, $e] = (0, Ne.useState)(""),
        [ot, V] = (0, Ne.useState)(!1),
        [_e, se] = (0, Ne.useState)(""),
        [be, Ie] = (0, Ne.useState)(!1),
        [ce, Je] = (0, Ne.useState)(!0),
        [We, qt] = (0, Ne.useState)([]),
        [Dt, _n] = (0, Ne.useState)(""),
        [ti, ih] = (0, Ne.useState)(!1),
        [yl, os] = (0, Ne.useState)("connected"),
        [Sl, rh] = (0, Ne.useState)(!1),
        [mo, Ec] = (0, Ne.useState)(""),
        [br, ls] = (0, Ne.useState)(!1),
        [sh, Rc] = (0, Ne.useState)(""),
        on = (0, Ne.useRef)(null),
        _l = (0, Ne.useRef)(new Set),
        bl = (0, Ne.useRef)(N2()),
        go = (0, Ne.useRef)(null),
        actionBusy = (0, Ne.useRef)(false),
        setupBusy = (0, Ne.useRef)(false),
        lastSetupJoin = (0,Ne.useRef)(false),
        he = (U, ne) => a === "English" ? U : ne;
    go.current = re;
    window.kazhuthaRequestExit = () => {if(o === "game") s("exit");};
    let Ml = d === "Local multiplayer" || d === "Mixed humans + AI" && p > 1,
        ni = re ? re.seat : Ml ? O?.players[O?.currentPlayer]?.type === "human" ? O.currentPlayer : H ?? 0 : 0,
        ve = (0, Ne.useMemo)(() => re ? Se?.game : O ? Eb(O, ni) : null, [O, re, Se, ni]),
        Ma = !!ve && ve.currentPlayer === ni && ve.status === "playing" && !ve.result && !Ee && !me && (!re || yl === "connected" && !Sl),
        us = !!O && Ml && O.players[O.currentPlayer]?.type === "human" && H !== O.currentPlayer && !Ee && O.status === "playing" && !O.result,
        T = (0, Ne.useMemo)(() => ve && Ma ? ah(ve) : [], [ve, Ma]),
        z = (0, Ne.useMemo)(() => {
            let U = [...ve?.hand || []];
            return W === "Suit" ? U.sort((ne, Me) => ["S", "H", "C", "D"].indexOf(ne.suit) - ["S", "H", "C", "D"].indexOf(Me.suit) || ne.rank - Me.rank) : W === "Rank" ? U.sort((ne, Me) => ne.rank - Me.rank) : U.sort((ne, Me) => {
                let pt = ae.indexOf(ne.id),
                    ct = ae.indexOf(Me.id);
                return (pt < 0 ? 99 : pt) - (ct < 0 ? 99 : ct)
            }), U
        }, [ve, W, ae]),
        Q = () => xe(""),
        j = () => {
            on.current || (on.current = new Ix), on.current.start(), on.current.master = nt ? 0 : we.Master / 100, on.current.cards = we.Cards / 100, on.current.ambience = we.Ambience / 100, on.current.setAmbience(L === "Monsoon Evening")
        };
    (0, Ne.useEffect)(() => {
        let U = ["Appu", "Ammu", "Unni", "Kannan", "Manu", "Anju", "Achu", "Balu"];
        for (let He = U.length - 1; He > 0; He--) {
            let Nt = Math.floor(Math.random() * (He + 1));
            [U[He], U[Nt]] = [U[Nt], U[He]]
        }
        m([xl.get("kazhutha-player-name") || "", "", "", "", "", ""]);
        let ne = xl.get("kazhutha-preferences");
        if (ne) try {
            let He = JSON.parse(ne);
            i(He.language || "English"), S(He.environment || "Kerala Home"), dt(He.volumes || we), Re(He.motion !== !1)
        } catch {}
        let Me = t ? null : xl.get("kazhutha-room");
        if (Me) try {
            let He = JSON.parse(Me);
            /^KZH-[A-F0-9]{6}$/.test(He.code) && He.token && ($e(He.code), Ec(He.code), Ze(He), l("game"), os("reconnecting"))
        } catch {}
        let pt = new URLSearchParams(window.location.search),
            ct = pt.get("room");
        return !t && ct && /^KZH-[A-F0-9]{6}$/.test(ct) ? ($e(ct), c("Private online room"), s("setup")) : !t && pt.get("mode") === "online" ? (c("Private online room"), s("setup")) : pt.get("mode") === "practice" && (D(!0), s("setup")), () => on.current?.close()
    }, []), (0, Ne.useEffect)(() => {
        xl.set("kazhutha-preferences", JSON.stringify({
            language: a,
            environment: L,
            volumes: we,
            motion: ue
        })), on.current && (on.current.master = nt ? 0 : we.Master / 100, on.current.cards = we.Cards / 100, on.current.ambience = we.Ambience / 100, on.current.setAmbience(L === "Monsoon Evening")), document.documentElement.lang = a === "English" ? "en" : "ml"
    }, [a, L, we, ue, nt]), (0, Ne.useEffect)(() => {
        if (!O || re || me || Ee || r || O.status !== "playing") return;
        if (O.result) {
            let ne = setTimeout(() => P(Me => I2(Me)), ue ? 1450 : 450);
            return () => clearTimeout(ne)
        }
        let U = O.currentPlayer;
        if (O.players[U].type === "ai") {
            let ne = setTimeout(() => {
                try {
                    let Me = Rx(Eb(O, U), h);
                    on.current?.play(), P(Tb(O, U, Me.card.id)), q(null)
                } catch (Me) {
                    xe(String(Me))
                }
            }, Pe === "Quick" ? 450 : 1100);
            return () => clearTimeout(ne)
        }
    }, [O, me, Ee, r, h, Pe, ue, re]), (0, Ne.useEffect)(() => {
        Z(""), J(null), ve?.lastEvent?.type === "vettu" && on.current?.play("vettu"), ve?.status === "finished" && on.current?.play("finish")
    }, [ve?.moves, ve?.round, ve?.status]), (0, Ne.useEffect)(() => {
        if (!ve || ve.status !== "finished" || I || _l.current.has(ve.id)) return;
        _l.current.add(ve.id);
        let U = {
            ...ve,
            hand: void 0
        };
        K("Saving result\u2026"), e({
            op: "save",
            result: U
        }).then(() => K(t ? "Saved on this device" : "Result saved")).catch(ne => {
            _l.current.delete(ve.id), K("Could not save this result."), xe(ne.message)
        })
    }, [ve?.status, ve?.id, I]);
    let Y = (0, Ne.useCallback)(async (U, ne = {}) => {
        if (!re || (U !== "poll" && actionBusy.current)) return;
        if(U !== "poll") actionBusy.current = true;
        let Me = re,
            pt = U !== "poll";
        return pt && rh(!0), bl.current.run(async () => {
            if (go.current?.token === Me.token) try {
                let ct = await e({
                    op: U,
                    ...Me,
                    ...ne
                });
                if (go.current?.token !== Me.token) return;
                ye(old => old && old.revision > ct.revision ? old : ct), os("connected"), pt && xe("")
            } catch (ct) {
                if (go.current?.token !== Me.token) return;
                let He = ct;
                if (He.status === 409) {
                    pt && xe("The table changed. Check your hand and play again.");
                    return
                }
                os("reconnecting"), (pt || He.status === 401 || He.status === 403 || He.status === 404) && xe(He.message)
            }
        }, U === "poll").finally(() => {
            pt && (rh(!1), actionBusy.current = false)
        })
    }, [re]);
    (0, Ne.useEffect)(() => {
        if (!re || o !== "game") return;
        Y("poll");
        let U = setInterval(() => {
                navigator.onLine && document.visibilityState !== "hidden" && Y("poll")
            }, 1100),
            ne = () => {
                os("reconnecting"), Y("poll")
            },
            Me = () => os("reconnecting"),
            pt = () => {
                document.visibilityState === "visible" && ne()
            };
        return window.addEventListener("online", ne), window.addEventListener("offline", Me), document.addEventListener("visibilitychange", pt), () => {
            clearInterval(U), window.removeEventListener("online", ne), window.removeEventListener("offline", Me), document.removeEventListener("visibilitychange", pt)
        }
    }, [re, o, Y]), (0, Ne.useEffect)(() => {
        if (!Ma || us || tt === "Off" || re || r) return;
        de(Number(tt));
        let U = setInterval(() => de(Me => Math.max(0, Me - 1)), 1e3),
            ne = setTimeout(() => {
                if (ve) {
                    let Me = Rx(ve, h);
                    De(Me.card.id)
                }
            }, Number(tt) * 1e3);
        return () => {
            clearInterval(U), clearTimeout(ne)
        }
    }, [ve?.currentPlayer, ve?.moves, Ma, us, tt, r]);

    function Ae(U = I) {
        const humanCount = d === "Local multiplayer" ? u : d === "Mixed humans + AI" ? p : 1;
        if (y.slice(0,humanCount).some(name => !name.trim())) { xe("Enter your name to continue"); return; }
        xl.set("kazhutha-player-name",y[0].trim());
        if(re)window.KazhuthaNetwork.leave(re);
        try {
            Q(), Ze(null), ye(null), j();
            let ne = _ === "Classic Kerala" ? Lc : _ === "Trump-on-First-Vettu" ? wb : b,
                Me = d === "Local multiplayer" ? u : d === "Mixed humans + AI" ? p : 1,
                pt = Array.from({
                    length: u
                }, (He, Nt) => ({
                    name: y[Nt]?.trim() || (Nt < Me ? "" : U2[Nt]),
                    type: Nt < Me ? "human" : "ai"
                })),
                ct = R2(pt, ne, Date.now());
            P(ct), D(U), l("game"), s(""), Ke(!1), q(null), ge([]), Ye(!0), setTimeout(() => Ye(!1), ue ? 2400 : 200), on.current?.play()
        } catch (ne) {
            xe(ne.message)
        }
    }

    function De(U) {
        if (!(!Ma || us || r)) try {
            if (on.current?.play(), re) {
                Y("play", {
                    card: U,
                    expectedGameId: ve.id,
                    expectedMoves: ve.moves
                });
                return
            }
            P(Tb(O, ni, U)), q(null)
        } catch (ne) {
            xe(ne.message)
        }
    }

    function Le(U) {
        F === U ? De(U) : Z(U)
    }

    function Ue(U = !1) {
        D(U), U && (c("Play against AI"), g(1)), xe(""), s("setup")
    }
    async function Xe(U = !1) {
        if(!y[0]?.trim()){xe("Enter your name to continue");return;}
        if(setupBusy.current)return;setupBusy.current=true;lastSetupJoin.current=U;
        xl.set("kazhutha-player-name",y[0].trim());
        V(!0), Q();
        try {
            j();
            let ne = xl.get("kazhutha-room"),
                Me = ne ? JSON.parse(ne) : null,
                pt = U ? {
                    op: "join",
                    code: Ge.trim().toUpperCase(),
                    name: y[0],
                    ...Me?.code === Ge.trim().toUpperCase() ? {
                        token: Me.token
                    } : {}
                } : {
                    op: "create",
                    name: y[0],
                    count: u,
                    difficulty: h,
                    rules: _ === "Trump-on-First-Vettu" ? "trump" : "classic"
                },
                ct = await e(pt),
                He = {
                    code: ct.code,
                    token: ct.token || Me?.token,
                    seat: ct.seat,
                name: y[0].trim()
                };
            Ke(!1), q(null), os("connected"), Ze(He), Ec(He.code), xl.set("kazhutha-room", JSON.stringify(He)), ye(ct), P(null), D(!1), l("game"), s("")
        } catch (ne) {
            xe(ne.message)
        } finally {
            V(!1); setupBusy.current=false;
        }
    }

    function ut(U = !1) {
        if (t) {
            xe("Online multiplayer is not connected on this website yet. You can play against AI or use local multiplayer on one device.");
            return
        }
        D(!1), c("Private online room"), _ === "Custom Family Rules" && v("Classic Kerala"), U && mo && $e(mo), xe(""), s("setup")
    }
    async function yt() {
        if (re) try {
            await navigator.clipboard.writeText(re.code), _n("Room code copied"), setTimeout(() => _n(""), 2200)
        } catch {
            Rc(Ob(window.KazhuthaNetwork.base, re.code)), ls(!0)
        }
    }
    async function ze() {
        if (!re) return;
        let U = Ob(window.KazhuthaNetwork.base, re.code);
        if (Rc(U), navigator.share) try {
            await navigator.share({
                title: "Play Kazhutha",
                text: "Join my Kazhutha table: " + re.code,
                url: U
            });
            return
        } catch (ne) {
            if (ne.name === "AbortError") return
        }
        try {
            await navigator.clipboard.writeText(U), _n("Invite link copied"), setTimeout(() => _n(""), 2200)
        } catch {}
        ls(!0)
    }
    async function Ot() {
        s("statistics"), N(!0), Q();
        try {
            R((await e({
                op: "stats"
            })).results)
        } catch (U) {
            xe(U.message)
        } finally {
            N(!1)
        }
    }

    function ln() {
        if(re)window.KazhuthaNetwork.leave(re);
        xl.set("kazhutha-room", ""); Ec(""); go.current=null;
        P(null), Ze(null), ye(null), l("menu"), s(""), Ke(!1), xe("")
    }

    function Kt() {
        if (!ve || !Ma) return;
        let U = Rx(ve, "Expert");
        J(U), Z(U.card.id)
    }
    let Rn = Rt.flatMap(U => U.players.map((ne, Me) => ({
            ...ne,
            loss: U.loser === Me,
            position: U.loser === Me ? U.players.length : U.safePlayers.indexOf(Me) + 1,
            cards: U.playedCounts[Me] || 0,
            vettu: U.vettuCounts[Me] || 0,
            total: U.players.length
        })).filter(ne => ne.type === "human")).reduce((U, ne) => {
            let Me = U[ne.name] || (U[ne.name] = {
                games: 0,
                loss: 0,
                cards: 0,
                vettu: 0,
                positions: 0,
                streak: 0,
                broken: !1,
                six: !1
            });
            return Me.games++, Me.loss += Number(ne.loss), Me.cards += ne.cards, Me.vettu += ne.vettu, Me.positions += ne.position, Me.six ||= ne.total === 6, !Me.broken && !ne.loss ? Me.streak++ : Me.broken = !0, U
        }, {}),
        Oe = r === "setup" ? I ? he("Your practice table", "\u0D2A\u0D30\u0D3F\u0D36\u0D40\u0D32\u0D28\u0D02") : he("Make room at the table", "\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02") : r === "settings" ? he("Make yourself at home", "\u0D15\u0D4D\u0D30\u0D2E\u0D40\u0D15\u0D30\u0D23\u0D19\u0D4D\u0D19\u0D7E") : r === "rules" ? he("How to play", "\u0D0E\u0D19\u0D4D\u0D19\u0D28\u0D46 \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02") : r === "statistics" ? he("Your table stories", "\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D23\u0D15\u0D4D\u0D15\u0D41\u0D15\u0D7E") : r === "tutorial" ? he("Learn a little. Play a card.", "\u0D15\u0D33\u0D3F\u0D1A\u0D4D\u0D1A\u0D41 \u0D2A\u0D20\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02") : r === "exit" ? he("Exit Game", "\u0D15\u0D33\u0D3F \u0D35\u0D3F\u0D1F\u0D23\u0D4B?") : "",
        Un = ve?.players[ve.currentPlayer]?.name;
    return (0, C.jsxs)("main", {
        className: "game-app env-" + Px.indexOf(L) + (o === "menu" ? " menu-screen" : " playing-screen"),
        children: [(0, C.jsx)("div", {
            className: "room-background",
            style: L === "Kerala Home" ? void 0 : {
                backgroundImage: `url('${Db(`/environment-${Px.indexOf(L)}.webp`)}')`
            }
        }), (0, C.jsx)("div", {
            className: "room-shade"
        }), (0, C.jsx)(Ib, {
            view: o === "menu" ? null : ve,
            menu: o === "menu",
            environment: L,
            cameraMode: A,
            dealing: Ee,
            motion: ue,
            onPositions: Lt
        }), (0, C.jsxs)("header", {
            className: "topbar",
            children: [(0, C.jsxs)("button", {
                className: "brand-small",
                onClick: () => o === "game" ? s("exit") : null,
                "aria-label": "Kazhutha main menu",
                children: [(0, C.jsx)("span", {
                    className: "brand-suit",
                    children: "\u2660"
                }), (0, C.jsxs)("span", {
                    children: ["KAZHUTHA ", (0, C.jsx)("small", {
                        children: "THE KERALA CARD GAME"
                    })]
                })]
            }), (0, C.jsxs)("div", {
                className: "top-actions",
                children: [o === "game" && (0,C.jsx)("button",{className:"exit-game-button",onClick:()=>s("exit"),children:"Exit Game"}), (0, C.jsxs)("button", {
                    className: "language",
                    onClick: () => i(a === "English" ? "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02" : "English"),
                    children: [(0, C.jsx)(Mu, {
                        size: 15
                    }), a === "English" ? "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02" : "English"]
                }), (0, C.jsx)("span", {
                    className: "divider"
                }), (0, C.jsx)("button", {
                    className: "icon-button",
                    "aria-label": nt ? "Unmute sound" : "Mute sound",
                    onClick: () => {
                        j(), ht(!nt)
                    },
                    children: nt ? (0, C.jsx)(Xf, {
                        size: 19
                    }) : (0, C.jsx)(Wf, {
                        size: 19
                    })
                }), (0, C.jsx)("button", {
                    className: "icon-button",
                    "aria-label": "Settings",
                    onClick: () => s("settings"),
                    children: (0, C.jsx)(Vf, {
                        size: 19
                    })
                })]
            })]
        }), o === "menu" ? (0, C.jsxs)(C.Fragment, {
            children: [(0, C.jsxs)("section", {
                className: "main-menu",
                children: [(0, C.jsxs)("div", {
                    className: "menu-eyebrow",
                    children: [(0, C.jsx)("span", {}), "PULL UP A CHAIR"]
                }), (0, C.jsx)("div", {
                    className: "malayalam-title",
                    children: "\u0D15\u0D34\u0D41\u0D24"
                }), (0, C.jsxs)("h1", {
                    children: ["KAZHUTHA", (0, C.jsx)("span", {
                        children: "THE KERALA CARD GAME"
                    })]
                }), (0, C.jsxs)("p", {
                    className: "menu-caption",
                    children: [he("Good company. A little mischief.", "\u0D15\u0D42\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D3E\u0D30\u0D41\u0D02 \u0D15\u0D41\u0D31\u0D1A\u0D4D\u0D1A\u0D41 \u0D15\u0D41\u0D38\u0D43\u0D24\u0D3F\u0D2F\u0D41\u0D02."), (0, C.jsx)("br", {}), he("Just don\u2019t be the last one holding cards.", "\u0D05\u0D35\u0D38\u0D3E\u0D28\u0D02 \u0D15\u0D48\u0D2F\u0D3F\u0D7D \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D4D \u0D2C\u0D3E\u0D15\u0D4D\u0D15\u0D3F\u0D2F\u0D3E\u0D35\u0D30\u0D41\u0D24\u0D4D.")]
                }), (0, C.jsxs)("button", {
                    className: "play-primary",
                    onClick: () => Ue(!1),
                    children: [(0, C.jsx)(zs, {
                        size: 19,
                        fill: "currentColor"
                    }), he("Play", "\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02"), (0, C.jsx)(Li, {
                        size: 21
                    })]
                }), (0, C.jsxs)("button", {
                    className: "menu-link",
                    onClick: () => Ue(!0),
                    children: [(0, C.jsx)(ks, {
                        size: 19
                    }), (0, C.jsxs)("span", {
                        children: [he("Practice", "\u0D2A\u0D30\u0D3F\u0D36\u0D40\u0D32\u0D28\u0D02"), (0, C.jsx)("small", {
                            children: he("A friendly table, with a little help", "\u0D38\u0D39\u0D3E\u0D2F\u0D24\u0D4D\u0D24\u0D4B\u0D1F\u0D46 \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02")
                        })]
                    }), (0, C.jsx)(_u, {
                        size: 17
                    })]
                }), (0, C.jsxs)("button", {
                    className: "friends-button",
                    onClick: () => ut(),
                    children: [(0, C.jsx)(Fo, {
                        size: 18
                    }), (0, C.jsxs)("span", {
                        children: [he("Play with friends", "\u0D15\u0D42\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D3E\u0D30\u0D41\u0D2E\u0D3E\u0D2F\u0D3F \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02"), (0, C.jsx)("small", {
                            children: t ? "Online play not connected" : he("Different phones. One table.", "\u0D2A\u0D32 \u0D2B\u0D4B\u0D23\u0D41\u0D15\u0D7E. \u0D12\u0D30\u0D47 \u0D15\u0D33\u0D3F.")
                        })]
                    }), (0, C.jsx)(Li, {
                        size: 17
                    })]
                }), (0, C.jsxs)("div", {
                    className: "app-menu-actions",
                    children: [t ? (0, C.jsx)("span", {
                        className: "downloaded-label",
                        children: "Downloaded edition \xB7 works offline"
                    }) : (0, C.jsxs)(C.Fragment, {
                        children: [null]
                    }), mo && !t && (0, C.jsxs)("button", {
                        className: "resume-room",
                        onClick: () => ut(!0),
                        children: [(0, C.jsx)(Lu, {
                            size: 14
                        }), "Rejoin ", mo]
                    })]
                }), (0, C.jsxs)("div", {
                    className: "menu-secondary",
                    children: [(0, C.jsxs)("button", {
                        onClick: () => s("rules"),
                        children: [(0, C.jsx)(yu, {
                            size: 17
                        }), he("How to play", "\u0D15\u0D33\u0D3F\u0D28\u0D3F\u0D2F\u0D2E\u0D19\u0D4D\u0D19\u0D7E")]
                    }), (0, C.jsxs)("button", {
                        onClick: Ot,
                        children: [(0, C.jsx)(Gr, {
                            size: 17
                        }), he("Statistics", "\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D23\u0D15\u0D4D\u0D15\u0D41\u0D15\u0D7E")]
                    })]
                }), (0, C.jsxs)("div", {
                    className: "menu-meta",
                    children: [(0, C.jsx)(Fo, {
                        size: 14
                    }), (0, C.jsxs)("span", {
                        children: ["2\u20136 ", he("players", "\u0D2A\u0D47\u0D7C")]
                    }), (0, C.jsx)("span", {
                        children: "\xB7"
                    }), (0, C.jsx)("span", {
                        children: he("No stakes. Just stories.", "\u0D2A\u0D28\u0D4D\u0D24\u0D2F\u0D2E\u0D3F\u0D32\u0D4D\u0D32, \u0D15\u0D33\u0D3F \u0D2E\u0D3E\u0D24\u0D4D\u0D30\u0D02.")
                    })]
                })]
            }), (0, C.jsxs)("aside", {
                className: "table-note",
                children: [(0, C.jsx)("div", {
                    className: "eyebrow",
                    children: he("THE ONLY RULE THAT REALLY MATTERS", "\u0D13\u0D7C\u0D24\u0D4D\u0D24\u0D3F\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02")
                }), (0, C.jsxs)("p", {
                    children: [he("Everybody gets away.", "\u0D0E\u0D32\u0D4D\u0D32\u0D3E\u0D35\u0D30\u0D41\u0D02 \u0D30\u0D15\u0D4D\u0D37\u0D2A\u0D4D\u0D2A\u0D46\u0D1F\u0D41\u0D02."), (0, C.jsx)("br", {}), (0, C.jsx)("em", {
                        children: he("Somebody becomes Kazhutha.", "\u0D12\u0D30\u0D3E\u0D7E \u0D15\u0D34\u0D41\u0D24\u0D2F\u0D3E\u0D15\u0D41\u0D02.")
                    })]
                }), (0, C.jsxs)("span", {
                    children: ["\u2660 ", (0, C.jsx)("b", {
                        children: "\u2665"
                    }), " \u2663 ", (0, C.jsx)("b", {
                        children: "\u2666"
                    })]
                })]
            }), (0, C.jsxs)("footer", {
                className: "menu-footer",
                children: [(0, C.jsxs)("button", {
                    onClick: () => s("settings"),
                    children: [(0, C.jsx)(Bf, {
                        size: 15
                    }), L, (0, C.jsx)("span", {
                        children: "CHANGE SCENE"
                    })]
                }), (0, C.jsx)("span", {
                    children: "MADE FOR ONE MORE ROUND"
                })]
            })]
        }) : (0, C.jsxs)(C.Fragment, {
            children: [ve && (0, C.jsxs)(C.Fragment, {
                children: [(0, C.jsxs)("div", {
                    className: "match-top",
                    children: [(0, C.jsxs)("button", {
                        className: "text-button",
                        onClick: () => s("rules"),
                        children: [(0, C.jsx)(yu, {
                            size: 14
                        }), ve.rules.name, (0, C.jsx)(_u, {
                            size: 13
                        })]
                    }), (0, C.jsxs)("div", {
                        className: "round-label",
                        children: [he("ROUND", "\u0D31\u0D57\u0D23\u0D4D\u0D1F\u0D4D"), " ", String(ve.round).padStart(2, "0"), " ", (0, C.jsxs)("span", {
                            children: ["\xB7 ", ve.activePlayers.length, " ", he("still in", "\u0D2A\u0D47\u0D7C \u0D2C\u0D3E\u0D15\u0D4D\u0D15\u0D3F")]
                        })]
                    }), (0, C.jsxs)("button", {
                        className: "text-button",
                        onClick: () => Ke(!me),
                        disabled: !!re,
                        children: [me ? (0, C.jsx)(zs, {
                            size: 14
                        }) : (0, C.jsx)(Au, {
                            size: 14
                        }), " ", re ? re.code : me ? he("Resume", "\u0D24\u0D41\u0D1F\u0D30\u0D3E\u0D02") : he("Pause", "\u0D28\u0D3F\u0D7C\u0D24\u0D4D\u0D24\u0D41\u0D15")]
                    })]
                }), (0, C.jsx)("div", {
                    className: "players-layer",
                    "aria-label": "Players at the table",
                    children: ve.players.map((U, ne) => {
                        if (ne === ni) return null;
                        let Me = (ne - ni + ve.players.length) % ve.players.length,
                            pt = B[Me] || {
                                x: 50,
                                y: 25
                            },
                            ct = ve.currentPlayer === ne,
                            He = ve.safePlayers.includes(ne);
                        return (0, C.jsxs)("div", {
                            className: "player-badge " + (ct ? "active " : "") + (He ? "safe" : ""),
                            style: {
                                left: `${Math.max(8,Math.min(92,pt.x))}%`,
                                top: `${Math.max(21,Math.min(62,pt.y))}%`
                            },
                            children: [(0, C.jsx)("span", {
                                className: "player-initial",
                                children: He ? (0, C.jsx)(pa, {
                                    size: 16
                                }) : U.name[0]
                            }), (0, C.jsxs)("div", {
                                children: [(0, C.jsx)("strong", {
                                    children: U.name
                                }), (0, C.jsxs)("small", {
                                    children: [He ? he("SAFE!", "\u0D30\u0D15\u0D4D\u0D37\u0D2A\u0D4D\u0D2A\u0D46\u0D1F\u0D4D\u0D1F\u0D41!") : ve.counts[ne] + " " + he("cards", "\u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E"), U.type === "ai" && !He ? " \xB7 AI" : ""]
                                })]
                            }), ct && !He && (0, C.jsx)("span", {
                                className: "turn-dots",
                                children: "\u2022\u2022\u2022"
                            })]
                        }, U.id)
                    })
                }), (0, C.jsxs)("section", {
                    className: "table-status",
                    "aria-live": "polite",
                    children: [(0, C.jsx)("div", {
                        className: "table-wordmark",
                        children: "\u0D15\u0D34\u0D41\u0D24"
                    }), ve.trumpSuit && (0, C.jsxs)("div", {
                        className: "trump-indicator",
                        children: [he("Trump", "\u0D24\u0D41\u0D30\u0D41\u0D2A\u0D4D\u0D2A\u0D4D"), " ", ei[ve.trumpSuit]]
                    }), (0, C.jsx)("p", {
                        className: ve.lastEvent?.type === "vettu" ? "vettu-text" : "",
                        children: ve.lastEvent?.type === "vettu" ? "VETTU! \xB7 \u0D35\u0D46\u0D1F\u0D4D\u0D1F\u0D4D!" : ve.result ? ve.result.collector !== null ? `${ve.players[ve.result.collector].name} ${he("collects the pile","\u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D0E\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D41")}` : he("A clean trick", "\u0D0E\u0D32\u0D4D\u0D32\u0D3E\u0D35\u0D30\u0D41\u0D02 \u0D12\u0D30\u0D47 \u0D07\u0D28\u0D02 \u0D15\u0D33\u0D3F\u0D1A\u0D4D\u0D1A\u0D41") : ve.leadSuit ? `${he("Follow","\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D47\u0D23\u0D4D\u0D1F\u0D24\u0D4D")} ${ei[ve.leadSuit]} ${a==="English"?x5[ve.leadSuit]:""}` : ve.opening ? he("Ace holder: choose any card", "A\u2660 \u0D06\u0D26\u0D4D\u0D2F\u0D02 \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D42") : he("A fresh trick", "\u0D05\u0D1F\u0D41\u0D24\u0D4D\u0D24 \u0D31\u0D57\u0D23\u0D4D\u0D1F\u0D4D")
                    })]
                }), (0, C.jsx)("div", {
                    className: "accessible-trick",
                    "aria-label": "Cards on the table",
                    children: ve.trick.map(U => (0, C.jsxs)("span", {
                        className: ["H", "D"].includes(U.card.suit) ? "red" : "",
                        children: [(0, C.jsx)("b", {
                            children: nh(U.card)
                        }), (0, C.jsx)("small", {
                            children: ve.players[U.player].name
                        })]
                    }, U.card.id))
                }), (0, C.jsxs)("div", {
                    className: "left-rail",
                    children: [(0, C.jsx)("button", {
                        className: "icon-button",
                        onClick: () => E(A === "First Person" ? "Table View" : A === "Table View" ? "Cinematic" : "First Person"),
                        "aria-label": "Change camera: " + A,
                        title: A,
                        children: (0, C.jsx)(Of, {
                            size: 19
                        })
                    }), (0, C.jsx)("button", {
                        className: "icon-button",
                        "aria-label": "Fullscreen",
                        onClick: () => {
                            document.fullscreenElement ? (document.exitFullscreen(), ih(!1)) : (document.documentElement.requestFullscreen?.(), ih(!0))
                        },
                        children: ti ? (0, C.jsx)(zf, {
                            size: 18
                        }) : (0, C.jsx)(Ff, {
                            size: 18
                        })
                    }), I && (0, C.jsx)("button", {
                        className: "icon-button",
                        onClick: () => {
                            fe(0), te(""), s("tutorial")
                        },
                        "aria-label": "Tutorial",
                        children: (0, C.jsx)(ks, {
                            size: 20
                        })
                    })]
                }), !us && (!Ml || H === ni) && !Ee && ve.status === "playing" && (0, C.jsxs)("div", {
                    className: "hand-zone",
                    onDragOver: U => U.preventDefault(),
                    onDrop: U => {
                        U.preventDefault();
                        let ne = U.dataTransfer.getData("card");
                        ne && De(ne)
                    },
                    children: [(0, C.jsxs)("div", {
                        className: "hand-toolbar",
                        children: [(0, C.jsxs)("div", {
                            className: "you-label",
                            children: [(0, C.jsx)("span", {
                                className: "player-initial",
                                children: ve.players[ni].name[0]
                            }), (0, C.jsxs)("div", {
                                children: [(0, C.jsxs)("strong", {
                                    children: [ve.players[ni].name, Ml ? "" : " \xB7 " + he("YOU", "\u0D28\u0D3F\u0D19\u0D4D\u0D19\u0D7E")]
                                }), (0, C.jsx)("small", {
                                    children: ve.safePlayers.includes(ni) ? he("You\u2019re safe. Enjoy the finish.", "\u0D30\u0D15\u0D4D\u0D37\u0D2A\u0D4D\u0D2A\u0D46\u0D1F\u0D4D\u0D1F\u0D41!") : Ma ? he("Your turn", "\u0D28\u0D3F\u0D19\u0D4D\u0D19\u0D33\u0D41\u0D1F\u0D46 \u0D0A\u0D34\u0D02") : `${Un} ${he("is thinking\u2026","\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D41\u2026")}`
                                })]
                            })]
                        }), (0, C.jsxs)("div", {
                            className: "hand-tools",
                            children: [I && (0, C.jsxs)("button", {
                                className: "hint-button",
                                onClick: Kt,
                                disabled: !Ma,
                                children: [(0, C.jsx)(Cu, {
                                    size: 16
                                }), he("Why this move?", "\u0D0F\u0D24\u0D41 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D4D?")]
                            }), (0, C.jsx)(ss, {
                                value: W,
                                onChange: G,
                                items: ["Suit", "Rank", "Manual"],
                                label: "Sort your hand"
                            })]
                        })]
                    }), $ && (0, C.jsxs)("div", {
                        className: "hint-panel",
                        children: [(0, C.jsx)(Cu, {
                            size: 18
                        }), (0, C.jsxs)("div", {
                            children: [(0, C.jsxs)("strong", {
                                children: [nh($.card), " \u2014 ", he("Suggested move", "\u0D28\u0D3F\u0D7C\u0D26\u0D47\u0D36\u0D02")]
                            }), (0, C.jsx)("p", {
                                children: $.reason
                            })]
                        }), (0, C.jsx)("button", {
                            onClick: () => J(null),
                            "aria-label": "Close suggestion",
                            children: "\xD7"
                        })]
                    }), (0, C.jsx)("div", {
                        className: "card-fan " + (z.length > 16 ? "large-hand" : ""),
                        style: {
                            "--card-count": z.length
                        },
                        children: z.map((U, ne) => {
                            let Me = T.some(ct => ct.id === U.id),
                                pt = (ne - (z.length - 1) / 2) * Math.min(2.2, 22 / Math.max(z.length, 1));
                            return (0, C.jsx)("button", {
                                draggable: Ma && Me,
                                onDragStart: ct => ct.dataTransfer.setData("card", U.id),
                                onDragOver: ct => {
                                    W === "Manual" && (ct.preventDefault(), ct.stopPropagation())
                                },
                                onDrop: ct => {
                                    if (W === "Manual") {
                                        ct.preventDefault(), ct.stopPropagation();
                                        let He = ct.dataTransfer.getData("card"),
                                            Nt = z.map(ai => ai.id).filter(ai => ai !== He);
                                        Nt.splice(Nt.indexOf(U.id), 0, He), ge(Nt)
                                    }
                                },
                                className: "playing-card " + (["H", "D"].includes(U.suit) ? "red " : "") + (F === U.id ? "selected " : "") + (Me ? "" : "illegal ") + (U.id === "S14" && ve.opening ? "opening-ace" : ""),
                                style: {
                                    "--angle": `${pt}deg`,
                                    "--lift": `${Math.abs(pt)*1.1}px`,
                                    "--i": ne
                                },
                                disabled: !Ma || !Me,
                                onClick: () => Le(U.id),
                                "aria-label": `${nh(U)}${Me?" \u2014 select, then tap again to play":" \u2014 cannot play now"}`,
                                children: (0, C.jsx)(B2, {
                                    card: U
                                })
                            }, U.id)
                        })
                    }), (0, C.jsxs)("div", {
                        className: "hand-bottom",
                        children: [(0, C.jsxs)("span", {
                            children: [z.length, " ", he("cards in hand", "\u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D15\u0D48\u0D2F\u0D3F\u0D7D"), " ", at > 0 && tt !== "Off" && Ma ? " \xB7 " + at + "s" : ""]
                        }), (0, C.jsx)("span", {
                            children: F ? he("Tap the selected card again to play", "\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D7B \u0D35\u0D40\u0D23\u0D4D\u0D1F\u0D41\u0D02 \u0D24\u0D4A\u0D1F\u0D41\u0D15") : he("Select a card, then tap again to play", "\u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D4D \u0D24\u0D3F\u0D30\u0D1E\u0D4D\u0D1E\u0D46\u0D1F\u0D41\u0D24\u0D4D\u0D24\u0D4D \u0D35\u0D40\u0D23\u0D4D\u0D1F\u0D41\u0D02 \u0D24\u0D4A\u0D1F\u0D41\u0D15")
                        }), (0, C.jsxs)("button", {
                            className: "play-selected",
                            disabled: !F || !Ma,
                            onClick: () => De(F),
                            children: [he("Play card", "\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D42"), (0, C.jsx)(Li, {
                                size: 16
                            })]
                        })]
                    })]
                }), (0, C.jsx)("div", {
                    className: "drop-area",
                    onDragOver: U => U.preventDefault(),
                    onDrop: U => {
                        U.preventDefault(), De(U.dataTransfer.getData("card"))
                    },
                    "aria-label": "Drop a card on the table"
                }), Ee && (0, C.jsxs)("div", {
                    className: "center-overlay",
                    children: [(0, C.jsx)("div", {
                        className: "dealing-icon",
                        children: (0, C.jsx)(Tu, {
                            size: 35
                        })
                    }), (0, C.jsx)("h2", {
                        children: he("A fresh deck. A fresh chance.", "\u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D35\u0D3F\u0D24\u0D30\u0D23\u0D02 \u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D41\u0D28\u0D4D\u0D28\u0D41")
                    }), (0, C.jsx)("p", {
                        children: he("Shuffling and dealing all 52 cards\u2026", "\u0D0E\u0D32\u0D4D\u0D32\u0D3E 52 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D33\u0D41\u0D02 \u0D35\u0D3F\u0D24\u0D30\u0D23\u0D02 \u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D41\u0D28\u0D4D\u0D28\u0D41\u2026")
                    })]
                }), us && (0, C.jsxs)("div", {
                    className: "privacy-overlay",
                    children: [(0, C.jsx)(wu, {
                        size: 36
                    }), (0, C.jsx)("span", {
                        className: "eyebrow",
                        children: "KAZHUTHA PARTY"
                    }), (0, C.jsxs)("h2", {
                        children: [he("Pass to", "\u0D2B\u0D4B\u0D7A \u0D15\u0D48\u0D2E\u0D3E\u0D31\u0D42:"), " ", Un]
                    }), (0, C.jsx)("p", {
                        children: he("Your hand is hidden. Tap when the device is with you.", "\u0D28\u0D3F\u0D19\u0D4D\u0D19\u0D33\u0D41\u0D1F\u0D46 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D2E\u0D31\u0D1A\u0D4D\u0D1A\u0D3F\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D41.")
                    }), (0, C.jsxs)("button", {
                        className: "gold-button",
                        onClick: () => q(ve.currentPlayer),
                        children: [(0, C.jsx)(Uf, {
                            size: 18
                        }), he("Show my cards", "\u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D15\u0D3E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42")]
                    })]
                }), me && !re && (0, C.jsxs)("div", {
                    className: "privacy-overlay",
                    children: [(0, C.jsx)(Au, {
                        size: 32
                    }), (0, C.jsx)("h2", {
                        children: he("Take your time.", "\u0D38\u0D3E\u0D35\u0D27\u0D3E\u0D28\u0D02 \u0D2E\u0D24\u0D3F.")
                    }), (0, C.jsx)("p", {
                        children: he("The table can wait.", "\u0D15\u0D33\u0D3F \u0D15\u0D3E\u0D24\u0D4D\u0D24\u0D3F\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D02.")
                    }), (0, C.jsxs)("button", {
                        className: "gold-button",
                        onClick: () => Ke(!1),
                        children: [(0, C.jsx)(zs, {
                            size: 17
                        }), he("Back to the table", "\u0D24\u0D41\u0D1F\u0D30\u0D3E\u0D02")]
                    })]
                }), (ve.status === "finished" || ve.status === "stalemate") && (0, C.jsxs)("div", {
                    className: "result-overlay",
                    children: [(0, C.jsx)("span", {
                        className: "result-emoji",
                        children: ve.status === "finished" ? "\u{1FACF}" : "\u21BB"
                    }), (0, C.jsx)("div", {
                        className: "eyebrow",
                        children: ve.status === "finished" ? he("AND THEN THERE WAS ONE", "\u0D12\u0D1F\u0D41\u0D35\u0D3F\u0D7D \u0D12\u0D30\u0D3E\u0D7E \u0D2E\u0D3E\u0D24\u0D4D\u0D30\u0D02") : he("LET\u2019S SHUFFLE AGAIN", "\u0D35\u0D40\u0D23\u0D4D\u0D1F\u0D41\u0D02 \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02")
                    }), (0, C.jsx)("h2", {
                        children: ve.status === "finished" ? "KAZHUTHA!" : he("A stubborn table.", "\u0D35\u0D40\u0D23\u0D4D\u0D1F\u0D41\u0D02 \u0D24\u0D41\u0D1F\u0D19\u0D4D\u0D19\u0D3E\u0D02")
                    }), (0, C.jsx)("div", {
                        className: "result-ml",
                        children: "\u0D15\u0D34\u0D41\u0D24!"
                    }), (0, C.jsx)("p", {
                        children: ve.status === "finished" ? `${ve.players[ve.loser].name} ${he("is the Kazhutha!","\u0D15\u0D34\u0D41\u0D24\u0D2F\u0D3E\u0D2F\u0D3F!")}` : ve.lastEvent.text
                    }), (0, C.jsx)("small", {
                        children: ve.status === "finished" ? he("Better luck next round \u{1F604}", "\u0D05\u0D1F\u0D41\u0D24\u0D4D\u0D24 \u0D15\u0D33\u0D3F\u0D2F\u0D3F\u0D7D \u0D28\u0D4B\u0D15\u0D4D\u0D15\u0D3E\u0D02 \u{1F604}") : he("No loss recorded.", "\u0D24\u0D4B\u0D7D\u0D35\u0D3F \u0D30\u0D47\u0D16\u0D2A\u0D4D\u0D2A\u0D46\u0D1F\u0D41\u0D24\u0D4D\u0D24\u0D3F\u0D2F\u0D3F\u0D1F\u0D4D\u0D1F\u0D3F\u0D32\u0D4D\u0D32.")
                    }), ve.status === "finished" && (0, C.jsx)("div", {
                        className: "finish-order",
                        children: ve.safePlayers.map((U, ne) => (0, C.jsxs)("span", {
                            children: [(0, C.jsx)("b", {
                                children: ne + 1
                            }), ve.players[U].name, (0, C.jsx)(pa, {
                                size: 13
                            })]
                        }, U))
                    }), (0, C.jsxs)("button", {
                        className: "gold-button",
                        disabled: Sl || (re && re.seat !== (Se?.hostSeat ?? 0)),
                        onClick: () => re ? void Y("rematch", {expectedGameId:ve.id}) : Ae(),
                        children: [(0, C.jsx)(Lu, {
                            size: 18
                        }), he("One more round", "\u0D12\u0D28\u0D4D\u0D28\u0D41\u0D15\u0D42\u0D1F\u0D3F \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02")]
                    }), (0, C.jsxs)("div", {
                        className: "result-actions",
                        children: [(0, C.jsx)("button", {
                            onClick: () => {ln();Ue(!1)},
                            children: he("New game", "\u0D2A\u0D41\u0D24\u0D3F\u0D2F \u0D15\u0D33\u0D3F")
                        }), (0, C.jsx)("button", {
                            onClick: ln,
                            children: he("Main menu", "\u0D2A\u0D4D\u0D30\u0D27\u0D3E\u0D28 \u0D2E\u0D46\u0D28\u0D41")
                        })]
                    }), (0, C.jsx)("small", {
                        className: "saved-status",
                        children: I ? he("Practice game \xB7 statistics unchanged", "\u0D2A\u0D30\u0D3F\u0D36\u0D40\u0D32\u0D28 \u0D15\u0D33\u0D3F") : k
                    })]
                })]
            }), re && !ve && (0, C.jsxs)("div", {
                className: "lobby-panel",
                children: [(0, C.jsx)("span", {
                    className: "eyebrow",
                    children: "A PRIVATE TABLE"
                }), (0, C.jsx)("h2", {
                    children: he("Waiting for your people", "\u0D15\u0D42\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D3E\u0D30\u0D46 \u0D15\u0D3E\u0D24\u0D4D\u0D24\u0D3F\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D41")
                }), (0, C.jsxs)("button", {
                    className: "room-code",
                    onClick: () => {
                        yt()
                    },
                    children: [re.code, (0, C.jsx)("small", {
                        children: "CLICK TO COPY"
                    })]
                }), (0, C.jsx)("p", {
                    children: "Each friend opens the invite link on their own device, enters a name, and joins."
                }), (0, C.jsxs)("button", {
                    className: "subtle-button invite-room",
                    onClick: () => {
                        ze()
                    },
                    children: [(0, C.jsx)(Bo, {
                        size: 16
                    }), "Share invite link"]
                }), (0, C.jsx)("small", {
                    className: "muted",
                    children: "Wait for your friends to appear below. Any empty seats become AI when you start."
                }), (0, C.jsx)("div", {
                    className: "lobby-seats",
                    children: Se?.lobby?.seats.map((U, ne) => (0, C.jsxs)("div", {
                        children: [(0, C.jsx)("span", {
                            className: "player-initial",
                            children: U.type === "open" ? "+" : U.name[0]
                        }), (0, C.jsx)("span", {
                            children: U.name
                        }), (0, C.jsx)("small", {
                            children: ne === (Se?.hostSeat ?? 0) ? "HOST" : U.type === "open" ? "WAITING" : "READY"
                        })]
                    }, ne))
                }), re.seat === (Se?.hostSeat ?? 0) ? (0, C.jsxs)("button", {
                    className: "gold-button",
                    disabled: Sl || yl !== "connected",
                    onClick: () => {
                        Y("start")
                    },
                    children: [(0, C.jsx)(zs, {
                        size: 17
                    }), "Start the game"]
                }) : (0, C.jsx)("p", {
                    children: "The host will start when everyone is here."
                }), (0, C.jsx)("button", {
                    className: "text-button",
                    onClick: () => s("exit"),
                    children: "Exit Game"
                })]
            }), (0, C.jsxs)("div", {
                className: "social-buttons",
                children: [re && (0, C.jsx)("button", {
                    "aria-label": "Share room invite",
                    title: "Share room invite",
                    onClick: () => {
                        ze()
                    },
                    children: (0, C.jsx)(Bo, {
                        size: 17
                    })
                }), ["\u{1F44F}", "\u{1F604}", "\u0D05\u0D2F\u0D4D\u0D2F\u0D4B!"].map(U => (0, C.jsx)("button", {
                    onClick: () => {
                        _n(U), re && ce && Y("chat", {
                            text: U
                        }), setTimeout(() => _n(""), 2400)
                    },
                    children: U
                }, U)), re && (0, C.jsx)("button", {
                    "aria-label": "Room chat",
                    onClick: () => Ie(!be),
                    children: (0, C.jsx)(kf, {
                        size: 18
                    })
                })]
            }), Dt && (0, C.jsx)("div", {
                className: "reaction-pop",
                children: Dt
            }), re && be && (0, C.jsxs)("aside", {
                className: "chat-panel",
                children: [(0, C.jsxs)("div", {
                    className: "chat-header",
                    children: [(0, C.jsx)("strong", {
                        children: "At the table"
                    }), (0, C.jsx)("button", {
                        onClick: () => Ie(!1),
                        "aria-label": "Close chat",
                        children: "\xD7"
                    })]
                }), (0, C.jsx)(Nb, {
                    label: "Chat & reactions",
                    checked: ce,
                    onChange: Je
                }), ce && (0, C.jsxs)(C.Fragment, {
                    children: [(0, C.jsx)("div", {
                        className: "chat-messages",
                        children: Se?.chat?.filter(U => !We.includes(U.seat)).map(U => (0, C.jsxs)("p", {
                            children: [(0, C.jsx)("b", {
                                children: U.name
                            }), " ", U.text]
                        }, U.id))
                    }), (0, C.jsxs)("form", {
                        onSubmit: U => {
                            U.preventDefault(), _e.trim() && (Y("chat", {
                                text: _e
                            }), se(""))
                        },
                        children: [(0, C.jsx)("input", {
                            value: _e,
                            onChange: U => se(U.target.value),
                            maxLength: 180,
                            placeholder: "Say something\u2026",
                            "aria-label": "Chat message"
                        }), (0, C.jsx)("button", {
                            "aria-label": "Send message",
                            children: (0, C.jsx)(Bo, {
                                size: 17
                            })
                        })]
                    })]
                }), Se?.lobby?.seats.map((U, ne) => ne !== re.seat && U.type === "human" && (0, C.jsxs)("div", {
                    className: "guest-actions",
                    children: [(0, C.jsx)("span", {
                        children: U.name
                    }), (0, C.jsx)("button", {
                        onClick: () => qt(Me => Me.includes(ne) ? Me.filter(pt => pt !== ne) : [...Me, ne]),
                        children: We.includes(ne) ? "Unmute" : "Mute"
                    }), re.seat === (Se?.hostSeat ?? 0) && (0, C.jsx)("button", {
                        onClick: () => {
                            Y("replace", {
                                seat: ne
                            })
                        },
                        children: "Replace if offline"
                    })]
                }, ne))]
            })]
        }), re && (0, C.jsx)("div", {
            className: "room-connection " + (yl === "connected" ? "" : "reconnecting"),
            role: "status",
            children: yl === "connected" ? (0, C.jsxs)(C.Fragment, {
                children: [(0, C.jsx)("span", {}), "Connected \xB7 ", re.code]
            }) : (0, C.jsxs)(C.Fragment, {
                children: ["Reconnecting\u2026 your seat is kept.", (0, C.jsx)("button", {
                    onClick: () => {
                        Y("poll")
                    },
                    children: "Retry"
                })]
            })
        }), (0, C.jsx)(md, {
            open: br,
            onOpenChange: ls,
            children: (0, C.jsxs)(gd, {
                className: "game-dialog",
                children: [(0, C.jsx)(xd, {
                    className: "dialog-heading",
                    children: "Invite your friends"
                }), (0, C.jsx)(vd, {
                    className: "dialog-description",
                    children: "Send this link yourself. Each friend joins on a separate phone or computer. Only the room code is included; your private session stays on your device."
                }), (0, C.jsx)("input", {
                    className: "invite-link",
                    "aria-label": "Room invitation link",
                    value: sh,
                    readOnly: !0,
                    onFocus: U => U.target.select()
                }), (0, C.jsx)("p", {
                    className: "muted",
                    children: "Open this link, enter your name, and join. The invite contains only the room code."
                }), (0, C.jsx)("button", {
                    className: "gold-button",
                    onClick: () => ls(!1),
                    children: "Done"
                })]
            })
        }), oe && (0, C.jsxs)("div", {
            className: "error-toast",
            role: "alert",
            children: [oe, /connect|server|network/i.test(oe) && (0,C.jsx)("button",{onClick:()=>re?Y("poll"):Xe(lastSetupJoin.current),children:"Retry"}), (0, C.jsx)("button", {
                onClick: Q,
                "aria-label": "Dismiss error",
                children: "\xD7"
            })]
        }), (0, C.jsx)(md, {
            open: !!r,
            onOpenChange: U => {
                U || (s(""), xe(""))
            },
            children: (0, C.jsxs)(gd, {
                className: "game-dialog " + (r === "setup" ? "setup-dialog" : ""),
                "data-kind": r,
                children: [(0, C.jsx)(xd, {
                    className: "dialog-heading",
                    children: Oe
                }), (0, C.jsx)(vd, {
                    className: "dialog-description",
                    children: r === "setup" ? he("Choose your company. We\u2019ll deal the cards.", "\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D30\u0D46 \u0D24\u0D3F\u0D30\u0D1E\u0D4D\u0D1E\u0D46\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D42.") : r === "rules" ? he("Get rid of your cards. Keep your friends.", "\u0D05\u0D35\u0D38\u0D3E\u0D28\u0D02 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D4D \u0D2C\u0D3E\u0D15\u0D4D\u0D15\u0D3F\u0D2F\u0D41\u0D33\u0D4D\u0D33\u0D2F\u0D3E\u0D7E \u0D15\u0D34\u0D41\u0D24.") : r === "statistics" ? he(t ? "Completed games, saved in this browser on this device." : "Completed games, saved for this account.", "\u0D2A\u0D42\u0D7C\u0D24\u0D4D\u0D24\u0D3F\u0D2F\u0D3E\u0D15\u0D4D\u0D15\u0D3F\u0D2F \u0D15\u0D33\u0D3F\u0D15\u0D33\u0D41\u0D1F\u0D46 \u0D15\u0D23\u0D15\u0D4D\u0D15\u0D41\u0D15\u0D7E.") : r === "settings" ? he("A few things to make the table yours.", "\u0D28\u0D3F\u0D19\u0D4D\u0D19\u0D7E\u0D15\u0D4D\u0D15\u0D3F\u0D37\u0D4D\u0D1F\u0D2E\u0D41\u0D33\u0D4D\u0D33 \u0D30\u0D40\u0D24\u0D3F\u0D2F\u0D3F\u0D7D.") : r === "tutorial" ? `LESSON ${ie+1} OF 7` : he("Are you sure you want to leave the game?", "\u0D2A\u0D42\u0D7C\u0D24\u0D4D\u0D24\u0D3F\u0D2F\u0D3E\u0D15\u0D3E\u0D24\u0D4D\u0D24 \u0D15\u0D33\u0D3F \u0D38\u0D02\u0D30\u0D15\u0D4D\u0D37\u0D3F\u0D15\u0D4D\u0D15\u0D3F\u0D32\u0D4D\u0D32.")
                }), r === "setup" && (0, C.jsxs)("div", {
                    className: "setup-body",
                    children: [!y[0]?.trim() && (0,C.jsx)("p",{className:"name-prompt",children:"Enter your name to continue"}), (0, C.jsxs)("div", {
                        className: "field",
                        children: [(0, C.jsx)("label", {
                            children: he("HOW MANY PLAYERS?", "\u0D0E\u0D24\u0D4D\u0D30 \u0D2A\u0D47\u0D7C?")
                        }), (0, C.jsx)("div", {
                            className: "number-picker",
                            children: [2, 3, 4, 5, 6].map(U => (0, C.jsxs)("button", {
                                className: u === U ? "chosen" : "",
                                onClick: () => {
                                    f(U), g(Math.min(p, U))
                                },
                                children: [U, (0, C.jsx)("small", {
                                    children: he("players", "\u0D2A\u0D47\u0D7C")
                                })]
                            }, U))
                        })]
                    }), (0, C.jsxs)("div", {
                        className: "field",
                        children: [(0, C.jsx)("label", {
                            children: he("WHO\u2019S AT THE TABLE?", "\u0D06\u0D30\u0D3E\u0D23\u0D4D \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D24\u0D4D?")
                        }), (0, C.jsx)("div", {
                            className: "mode-options",
                            children: ["Play against AI", "Local multiplayer", "Mixed humans + AI", "Private online room"].filter(U => (!I || U === "Play against AI") && (!t || U !== "Private online room")).map((U, ne) => (0, C.jsxs)("button", {
                                className: d === U ? "chosen" : "",
                                onClick: () => {
                                    c(U), U === "Private online room" && _ === "Custom Family Rules" && v("Classic Kerala")
                                },
                                children: [ne === 0 ? (0, C.jsx)(ks, {
                                    size: 18
                                }) : ne === 3 ? (0, C.jsx)(Mu, {
                                    size: 18
                                }) : (0, C.jsx)(Fo, {
                                    size: 18
                                }), (0, C.jsxs)("span", {
                                    children: [he(U, {
                                        "Play against AI": "AI \u0D2F\u0D41\u0D2E\u0D3E\u0D2F\u0D3F \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02",
                                        "Local multiplayer": "\u0D12\u0D30\u0D47 \u0D2B\u0D4B\u0D23\u0D3F\u0D7D \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02",
                                        "Mixed humans + AI": "\u0D15\u0D42\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D3E\u0D30\u0D41\u0D02 AI \u0D2F\u0D41\u0D02",
                                        "Private online room": "\u0D13\u0D7A\u0D32\u0D48\u0D28\u0D3F\u0D7D \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02"
                                    } [U]), (0, C.jsx)("small", {
                                        children: ne === 0 ? "Your own friendly rivals" : ne === 1 ? "Pass one device around" : ne === 2 ? "Friends and a few familiar faces" : "Invite friends with a room code"
                                    })]
                                }), d === U && (0, C.jsx)(pa, {
                                    size: 16
                                })]
                            }, U))
                        })]
                    }), d === "Mixed humans + AI" && (0, C.jsxs)("div", {
                        className: "field inline-field",
                        children: [(0, C.jsx)("label", {
                            children: "Human players"
                        }), (0, C.jsx)(ss, {
                            value: String(p),
                            onChange: U => g(+U),
                            items: Array.from({
                                length: u
                            }, (U, ne) => String(ne + 1)),
                            label: "Human players"
                        })]
                    }), (0, C.jsx)("div", {
                        className: "names-grid",
                        children: Array.from({
                            length: d === "Private online room" ? 1 : u
                        }, (U, ne) => (0, C.jsxs)("label", {
                            children: [(0, C.jsxs)("small", {
                                children: [ne < (d === "Local multiplayer" ? u : d === "Mixed humans + AI" ? p : 1) ? he("PLAYER", "\u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D30\u0D7B") : "AI", " ", ne + 1]
                            }), (0, C.jsx)("input", {
                                value: y[ne],
                                placeholder: ne < (d === "Local multiplayer" ? u : d === "Mixed humans + AI" ? p : 1) ? "Enter your name" : U2[ne],
                                maxLength: 24,
                                "aria-label": `Player ${ne+1} name`,
                                onChange: Me => m(pt => pt.map((ct, He) => He === ne ? Me.target.value : ct))
                            })]
                        }, ne))
                    }), (0, C.jsxs)("div", {
                        className: "two-fields",
                        children: [(0, C.jsxs)("div", {
                            className: "field",
                            children: [(0, C.jsx)("label", {
                                children: he("RULESET", "\u0D28\u0D3F\u0D2F\u0D2E\u0D19\u0D4D\u0D19\u0D7E")
                            }), (0, C.jsx)(ss, {
                                value: _,
                                onChange: v,
                                items: d === "Private online room" ? ["Classic Kerala", "Trump-on-First-Vettu"] : ["Classic Kerala", "Trump-on-First-Vettu", "Custom Family Rules"],
                                label: "Ruleset"
                            })]
                        }), (0, C.jsxs)("div", {
                            className: "field",
                            children: [(0, C.jsx)("label", {
                                children: he("AI DIFFICULTY", "AI \u0D28\u0D3F\u0D32\u0D35\u0D3E\u0D30\u0D02")
                            }), (0, C.jsx)(ss, {
                                value: h,
                                onChange: x,
                                items: ["Easy", "Medium", "Hard", "Expert"],
                                label: "AI difficulty"
                            })]
                        })]
                    }), _ === "Custom Family Rules" && (0, C.jsxs)("div", {
                        className: "custom-rules",
                        children: [
                            [
                                ["aceStart", "A\u2660 starts (off: random player)"],
                                ["firstTrump", "First Vettu establishes trump"],
                                ["cutEnds", "Vettu ends the trick immediately"],
                                ["trumpWins", "Highest trump determines winner"],
                                ["forceTrump", "Must play trump when void"],
                                ["winnerLeads", "Winner / collector leads next"],
                                ["collectCutter", "Alternative: cutter collects the pile"],
                                ["allow2", "Allow two players"],
                                ["allow3", "Allow three players"]
                            ].map(([U, ne]) => (0, C.jsx)(Nb, {
                                label: ne,
                                checked: b[U],
                                onChange: Me => w(pt => ({
                                    ...pt,
                                    [U]: Me
                                }))
                            }, U)), (0, C.jsx)("p", {
                                children: "Without trump ranking, the highest led-suit card determines the winner. If winner leads is off, play continues clockwise after the last player."
                            }), (0, C.jsxs)("div", {
                                className: "row",
                                children: [(0, C.jsx)("button", {
                                    className: "subtle-button",
                                    onClick: () => {
                                        xl.set("kazhutha-family-rules", JSON.stringify(b)), _n("Family rules saved"), setTimeout(() => _n(""), 2e3)
                                    },
                                    children: "Save family preset"
                                }), (0, C.jsx)("button", {
                                    className: "subtle-button",
                                    onClick: () => {
                                        let U = xl.get("kazhutha-family-rules");
                                        if (U) try {
                                            w(JSON.parse(U))
                                        } catch {
                                            xe("Unable to load that preset.")
                                        } else xe("No family preset saved on this device yet.")
                                    },
                                    children: "Load preset"
                                })]
                            })
                        ]
                    }), (0, C.jsxs)("div", {
                        className: "field",
                        children: [(0, C.jsx)("label", {
                            children: he("THE SETTING", "\u0D38\u0D4D\u0D25\u0D32\u0D02")
                        }), (0, C.jsx)(ss, {
                            value: L,
                            onChange: S,
                            items: Px,
                            label: "Environment"
                        })]
                    }), d === "Private online room" ? (0, C.jsxs)(C.Fragment, {
                        children: [(0, C.jsxs)("button", {
                            disabled: ot,
                            className: "gold-button",
                            onClick: () => {
                                Xe()
                            },
                            children: [(0, C.jsx)(wu, {
                                size: 17
                            }), ot ? "Opening\u2026" : "Create private room"]
                        }), (0, C.jsxs)("div", {
                            className: "join-row",
                            children: [(0, C.jsx)("input", {
                                value: Ge,
                                onChange: U => $e(U.target.value.toUpperCase()),
                                placeholder: "KZH-XXXXXX",
                                "aria-label": "Room code"
                            }), (0, C.jsx)("button", {
                                className: "subtle-button",
                                disabled: ot || !Ge,
                                onClick: () => {
                                    Xe(!0)
                                },
                                children: "Join / reconnect"
                            })]
                        }), (0, C.jsx)("small", {
                            className: "muted",
                            children: "Your seat is restored on this device after a temporary disconnection. Rooms expire after 24 hours of inactivity."
                        })]
                    }) : (0, C.jsxs)("button", {
                        className: "gold-button",
                        onClick: () => Ae(),
                        children: [(0, C.jsx)(Tu, {
                            size: 18
                        }), he("Shuffle & deal", "\u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D35\u0D3F\u0D24\u0D30\u0D23\u0D02 \u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D42"), (0, C.jsx)(Li, {
                            size: 18
                        })]
                    })]
                }), r === "settings" && (0, C.jsxs)("div", {
                    className: "settings-body",
                    children: [(0, C.jsxs)("div", {
                        className: "two-fields",
                        children: [(0, C.jsxs)("div", {
                            className: "field",
                            children: [(0, C.jsx)("label", {
                                children: "LANGUAGE / \u0D2D\u0D3E\u0D37"
                            }), (0, C.jsx)(ss, {
                                value: a,
                                onChange: i,
                                items: ["English", "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02"],
                                label: "Language"
                            })]
                        }), (0, C.jsxs)("div", {
                            className: "field",
                            children: [(0, C.jsx)("label", {
                                children: he("CAMERA", "\u0D15\u0D4D\u0D2F\u0D3E\u0D2E\u0D31")
                            }), (0, C.jsx)(ss, {
                                value: A,
                                onChange: E,
                                items: ["First Person", "Table View", "Cinematic"],
                                label: "Camera mode"
                            })]
                        })]
                    }), (0, C.jsxs)("div", {
                        className: "field",
                        children: [(0, C.jsx)("label", {
                            children: he("ENVIRONMENT", "\u0D38\u0D4D\u0D25\u0D32\u0D02")
                        }), (0, C.jsx)("div", {
                            className: "environment-options",
                            children: Px.map((U, ne) => (0, C.jsxs)("button", {
                                className: L === U ? "chosen" : "",
                                onClick: () => S(U),
                                children: [(0, C.jsx)("span", {
                                    style: {
                                        backgroundImage: `url('${Db(ne===0?"/kerala-room.webp":`/environment-${ne}.webp`)}')`
                                    }
                                }), U, L === U && (0, C.jsx)(pa, {
                                    size: 15
                                })]
                            }, U))
                        })]
                    }), (0, C.jsx)(Nb, {
                        label: he("Card & character animations", "\u0D1A\u0D32\u0D28\u0D19\u0D4D\u0D19\u0D7E"),
                        checked: ue,
                        onChange: Re
                    }), (0, C.jsxs)("div", {
                        className: "two-fields",
                        children: [(0, C.jsxs)("div", {
                            className: "field",
                            children: [(0, C.jsx)("label", {
                                children: "AI PACE"
                            }), (0, C.jsx)(ss, {
                                value: Pe,
                                onChange: Ve,
                                items: ["Relaxed", "Quick"],
                                label: "AI pace"
                            })]
                        }), (0, C.jsxs)("div", {
                            className: "field",
                            children: [(0, C.jsx)("label", {
                                children: "LOCAL TURN TIMER"
                            }), (0, C.jsx)(ss, {
                                value: tt,
                                onChange: Qe,
                                items: ["Off", "15", "30", "60"],
                                label: "Turn timer in seconds"
                            })]
                        })]
                    }), (0, C.jsx)("small", {
                        className: "muted",
                        children: "When a local timer expires, AI plays a legal card for you. The timer pauses while your hand is hidden."
                    }), (0, C.jsxs)("div", {
                        className: "audio-controls",
                        children: [
                            ["Master", "Cards", "Ambience"].map(U => (0, C.jsxs)("div", {
                                className: "volume-row",
                                children: [(0, C.jsx)("label", {
                                    children: U
                                }), (0, C.jsx)(XR, {
                                    value: [we[U]],
                                    onValueChange: ne => {
                                        j(), dt(Me => ({
                                            ...Me,
                                            [U]: ne[0]
                                        }))
                                    },
                                    max: 100,
                                    step: 1,
                                    "aria-label": `${U} volume`
                                }), (0, C.jsxs)("span", {
                                    children: [we[U], "%"]
                                })]
                            }, U)), (0, C.jsx)("small", {
                                className: "muted",
                                children: "Gentle card sounds and room ambience. Monsoon Evening adds rain. Music and recorded voices are not included."
                            })
                        ]
                    }), (0, C.jsxs)("button", {
                        className: "subtle-button",
                        onClick: () => {
                            fe(0), te(""), s("tutorial")
                        },
                        children: ["Open interactive tutorial ", (0, C.jsx)(Li, {
                            size: 16
                        })]
                    })]
                }), r === "rules" && (0, C.jsxs)("div", {
                    className: "rulebook",
                    children: [(0, C.jsxs)("div", {
                        className: "rules-banner",
                        children: [(0, C.jsx)("span", {
                            children: "\u2660"
                        }), (0, C.jsxs)("div", {
                            children: [(0, C.jsx)("strong", {
                                children: ve?.rules.name || _
                            }), (0, C.jsx)("small", {
                                children: he("2\u20136 players \xB7 52 cards \xB7 No jokers", "2\u20136 \u0D2A\u0D47\u0D7C \xB7 52 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E")
                            })]
                        })]
                    }), (0, C.jsxs)("div", {
                        className: "rule-item",
                        children: [(0, C.jsx)("b", {
                            children: "01"
                        }), (0, C.jsxs)("div", {
                            children: [(0, C.jsx)("h3", {
                                children: he("Get out before the others", "\u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D24\u0D40\u0D7C\u0D15\u0D4D\u0D15\u0D42")
                            }), (0, C.jsx)("p", {
                                children: he("Empty your hand. The last player left with cards becomes the Kazhutha. There are no points to chase.", "\u0D15\u0D48\u0D2F\u0D3F\u0D32\u0D46 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D06\u0D26\u0D4D\u0D2F\u0D02 \u0D24\u0D40\u0D7C\u0D15\u0D4D\u0D15\u0D42. \u0D05\u0D35\u0D38\u0D3E\u0D28\u0D02 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D2C\u0D3E\u0D15\u0D4D\u0D15\u0D3F\u0D2F\u0D41\u0D33\u0D4D\u0D33\u0D2F\u0D3E\u0D7E \u0D15\u0D34\u0D41\u0D24.")
                            })]
                        })]
                    }), (0, C.jsxs)("div", {
                        className: "rule-item",
                        children: [(0, C.jsx)("b", {
                            children: "02"
                        }), (0, C.jsxs)("div", {
                            children: [(0, C.jsx)("h3", {
                                children: he("Ace holder leads any card. Then follow suit.", "A\u2660 \u0D06\u0D26\u0D4D\u0D2F\u0D02. \u0D05\u0D24\u0D47 \u0D07\u0D28\u0D02 \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D42.")
                            }), (0, C.jsx)("p", {
                                children: he("Deal all 52 cards clockwise. Some players receive one extra. Whoever has A\u2660 leads first and may choose any card from their hand. Then follow the led suit if you have it. A is highest; 2 is lowest.", "\u0D0E\u0D32\u0D4D\u0D32\u0D3E \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D33\u0D41\u0D02 \u0D35\u0D3F\u0D24\u0D30\u0D23\u0D02 \u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D41\u0D15. A\u2660 \u0D09\u0D33\u0D4D\u0D33\u0D2F\u0D3E\u0D7E \u0D24\u0D41\u0D1F\u0D19\u0D4D\u0D19\u0D41\u0D02. \u0D06\u0D26\u0D4D\u0D2F\u0D02 \u0D15\u0D33\u0D3F\u0D1A\u0D4D\u0D1A \u0D07\u0D28\u0D02 \u0D15\u0D48\u0D2F\u0D3F\u0D32\u0D41\u0D23\u0D4D\u0D1F\u0D46\u0D19\u0D4D\u0D15\u0D3F\u0D7D \u0D05\u0D24\u0D41\u0D24\u0D28\u0D4D\u0D28\u0D46 \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D23\u0D02. A \u0D0F\u0D31\u0D4D\u0D31\u0D35\u0D41\u0D02 \u0D35\u0D32\u0D41\u0D24\u0D4D; 2 \u0D0F\u0D31\u0D4D\u0D31\u0D35\u0D41\u0D02 \u0D1A\u0D46\u0D31\u0D41\u0D24\u0D4D.")
                            })]
                        })]
                    }), (0, C.jsxs)("div", {
                        className: "rule-item",
                        children: [(0, C.jsx)("b", {
                            children: "03"
                        }), (0, C.jsxs)("div", {
                            children: [(0, C.jsx)("h3", {
                                children: he("No suit? Vettu!", "\u0D06 \u0D07\u0D28\u0D02 \u0D07\u0D32\u0D4D\u0D32\u0D47? \u0D35\u0D46\u0D1F\u0D4D\u0D1F\u0D4D!")
                            }), (0, C.jsx)("p", {
                                children: (ve?.rules || (_ === "Trump-on-First-Vettu" ? wb : _ === "Custom Family Rules" ? b : Lc)).firstTrump ? he("There is no Vettu in round 1; off-suit cards are discarded with the clean pile. From round 2, the first Vettu establishes trump for the match. Follow the led suit whenever possible; when void, play trump if you have it and the rule is enabled. The highest trump wins, otherwise the highest led-suit card wins. A trick containing a cut is collected by its winner. Clean tricks are discarded.", "\u0D06\u0D26\u0D4D\u0D2F \u0D35\u0D46\u0D1F\u0D4D\u0D1F\u0D3F\u0D28\u0D4D\u0D31\u0D46 \u0D07\u0D28\u0D02 \u0D24\u0D41\u0D30\u0D41\u0D2A\u0D4D\u0D2A\u0D3E\u0D15\u0D41\u0D02. \u0D15\u0D33\u0D3F\u0D1A\u0D4D\u0D1A \u0D07\u0D28\u0D02 \u0D09\u0D23\u0D4D\u0D1F\u0D46\u0D19\u0D4D\u0D15\u0D3F\u0D7D \u0D05\u0D24\u0D41\u0D24\u0D28\u0D4D\u0D28\u0D46 \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D23\u0D02. \u0D07\u0D32\u0D4D\u0D32\u0D46\u0D19\u0D4D\u0D15\u0D3F\u0D7D \u0D24\u0D41\u0D30\u0D41\u0D2A\u0D4D\u0D2A\u0D4D \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D15. \u0D35\u0D46\u0D1F\u0D4D\u0D1F\u0D41\u0D33\u0D4D\u0D33 \u0D31\u0D57\u0D23\u0D4D\u0D1F\u0D3F\u0D32\u0D46 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D1C\u0D2F\u0D3F\u0D1A\u0D4D\u0D1A\u0D2F\u0D3E\u0D7E \u0D0E\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D41\u0D02.") : he("There is no Vettu in the first round: if you cannot follow suit, discard any card and let the trick continue. From round 2 onward, if you cannot follow the led suit, you may play another suit; that off-suit play is Vettu and the normal collection rule applies.", "\u0D2E\u0D31\u0D4D\u0D31\u0D4A\u0D30\u0D41 \u0D07\u0D28\u0D02 \u0D15\u0D33\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02. \u0D31\u0D57\u0D23\u0D4D\u0D1F\u0D4D \u0D09\u0D1F\u0D7B \u0D28\u0D3F\u0D7D\u0D15\u0D4D\u0D15\u0D41\u0D02. \u0D06\u0D26\u0D4D\u0D2F\u0D02 \u0D15\u0D33\u0D3F\u0D1A\u0D4D\u0D1A \u0D07\u0D28\u0D24\u0D4D\u0D24\u0D3F\u0D32\u0D46 \u0D0F\u0D31\u0D4D\u0D31\u0D35\u0D41\u0D02 \u0D35\u0D32\u0D3F\u0D2F \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D3F\u0D1F\u0D4D\u0D1F\u0D2F\u0D3E\u0D7E \u0D2E\u0D41\u0D34\u0D41\u0D35\u0D7B \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D33\u0D41\u0D02 \u0D0E\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D41\u0D02. \u0D05\u0D2F\u0D3E\u0D7E \u0D05\u0D1F\u0D41\u0D24\u0D4D\u0D24\u0D24\u0D4D \u0D24\u0D41\u0D1F\u0D19\u0D4D\u0D19\u0D41\u0D02.")
                            })]
                        })]
                    }), (0, C.jsxs)("div", {
                        className: "rule-item",
                        children: [(0, C.jsx)("b", {
                            children: "04"
                        }), (0, C.jsxs)("div", {
                            children: [(0, C.jsx)("h3", {
                                children: he("A clean trick leaves the game", "\u0D35\u0D46\u0D1F\u0D4D\u0D1F\u0D3F\u0D32\u0D4D\u0D32\u0D46\u0D19\u0D4D\u0D15\u0D3F\u0D7D \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D2E\u0D3E\u0D31\u0D4D\u0D31\u0D3F\u0D35\u0D2F\u0D4D\u0D15\u0D4D\u0D15\u0D3E\u0D02")
                            }), (0, C.jsx)("p", {
                                children: he("If everyone follows suit, discard the pile. The highest led-suit card leads next. If that player has become safe, the next active player clockwise leads.", "\u0D0E\u0D32\u0D4D\u0D32\u0D3E\u0D35\u0D30\u0D41\u0D02 \u0D12\u0D30\u0D47 \u0D07\u0D28\u0D02 \u0D15\u0D33\u0D3F\u0D1A\u0D4D\u0D1A\u0D3E\u0D7D \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D2E\u0D3E\u0D31\u0D4D\u0D31\u0D3F\u0D35\u0D2F\u0D4D\u0D15\u0D4D\u0D15\u0D41\u0D15. \u0D35\u0D32\u0D3F\u0D2F \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D3F\u0D1F\u0D4D\u0D1F\u0D2F\u0D3E\u0D7E \u0D05\u0D1F\u0D41\u0D24\u0D4D\u0D24\u0D24\u0D4D \u0D24\u0D41\u0D1F\u0D19\u0D4D\u0D19\u0D41\u0D02. \u0D05\u0D2F\u0D3E\u0D7E \u0D30\u0D15\u0D4D\u0D37\u0D2A\u0D4D\u0D2A\u0D46\u0D1F\u0D4D\u0D1F\u0D46\u0D19\u0D4D\u0D15\u0D3F\u0D7D \u0D05\u0D1F\u0D41\u0D24\u0D4D\u0D24\u0D2F\u0D3E\u0D7E \u0D24\u0D41\u0D1F\u0D19\u0D4D\u0D19\u0D41\u0D02.")
                            })]
                        })]
                    }), (0, C.jsxs)("div", {
                        className: "rule-item",
                        children: [(0, C.jsx)("b", {
                            children: "05"
                        }), (0, C.jsxs)("div", {
                            children: [(0, C.jsx)("h3", {
                                children: he("Wait for the trick to resolve", "\u0D31\u0D57\u0D23\u0D4D\u0D1F\u0D4D \u0D24\u0D40\u0D30\u0D1F\u0D4D\u0D1F\u0D46")
                            }), (0, C.jsx)("p", {
                                children: he("An empty hand becomes safe only after any collection. If everyone uses their last card in the same trick, the winner keeps that final pile and becomes Kazhutha. A position repeating three times is a draw: redeal, with no loss recorded.", "\u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D0E\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D47\u0D23\u0D4D\u0D1F\u0D24\u0D41\u0D23\u0D4D\u0D1F\u0D46\u0D19\u0D4D\u0D15\u0D3F\u0D7D \u0D05\u0D24\u0D3F\u0D28\u0D41\u0D36\u0D47\u0D37\u0D2E\u0D3E\u0D23\u0D4D \u0D30\u0D15\u0D4D\u0D37\u0D2A\u0D4D\u0D2A\u0D46\u0D1F\u0D41\u0D15. \u0D0E\u0D32\u0D4D\u0D32\u0D3E\u0D35\u0D30\u0D41\u0D1F\u0D46\u0D2F\u0D41\u0D02 \u0D05\u0D35\u0D38\u0D3E\u0D28 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D4D \u0D12\u0D30\u0D47 \u0D31\u0D57\u0D23\u0D4D\u0D1F\u0D3F\u0D7D \u0D24\u0D40\u0D7C\u0D28\u0D4D\u0D28\u0D3E\u0D7D \u0D1C\u0D2F\u0D3F\u0D1A\u0D4D\u0D1A\u0D2F\u0D3E\u0D7E \u0D06 \u0D1A\u0D40\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E \u0D0E\u0D1F\u0D41\u0D24\u0D4D\u0D24\u0D4D \u0D15\u0D34\u0D41\u0D24\u0D2F\u0D3E\u0D15\u0D41\u0D02. \u0D12\u0D30\u0D47 \u0D38\u0D4D\u0D25\u0D3F\u0D24\u0D3F \u0D2E\u0D42\u0D28\u0D4D\u0D28\u0D41 \u0D24\u0D35\u0D23 \u0D35\u0D28\u0D4D\u0D28\u0D3E\u0D7D \u0D15\u0D33\u0D3F \u0D35\u0D40\u0D23\u0D4D\u0D1F\u0D41\u0D02 \u0D24\u0D41\u0D1F\u0D19\u0D4D\u0D19\u0D3E\u0D02.")
                            })]
                        })]
                    }), (ve?.rules.name || _) === "Custom Family Rules" && (0, C.jsx)("div", {
                        className: "family-summary",
                        children: Object.entries(ve?.rules || b).filter(([U]) => U !== "name").map(([U, ne]) => (0, C.jsxs)("p", {
                            children: [{
                                aceStart: "Ace starts",
                                firstTrump: "First cut sets trump",
                                cutEnds: "Cut ends trick",
                                trumpWins: "Highest trump wins",
                                forceTrump: "Must play trump when void",
                                winnerLeads: "Winner/collector leads",
                                collectCutter: "Cutter collects instead",
                                allow2: "Allow 2 players",
                                allow3: "Allow 3 players"
                            } [U], (0, C.jsx)("b", {
                                children: ne ? "On" : "Off"
                            })]
                        }, U))
                    }), (0, C.jsxs)("p", {
                        className: "house-note",
                        children: ["There is no Vettu in the first round in any mode. A player unable to follow suit may discard any card; the trick continues. From round 2, the selected collection rules apply. ", (0, C.jsx)("a", {
                            href: "https://thulaa.com/",
                            target: "_blank",
                            rel: "noreferrer",
                            children: "Classic rule reference \u2197"
                        })]
                    }), (0, C.jsxs)("button", {
                        className: "gold-button",
                        onClick: () => {
                            fe(0), te(""), s("tutorial")
                        },
                        children: [(0, C.jsx)(ks, {
                            size: 19
                        }), he("Learn by playing", "\u0D15\u0D33\u0D3F\u0D1A\u0D4D\u0D1A\u0D41 \u0D2A\u0D20\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02")]
                    })]
                }), r === "tutorial" && (0, C.jsxs)("div", {
                    className: "tutorial",
                    children: [(0, C.jsx)("div", {
                        className: "lesson-progress",
                        children: vl.map((U, ne) => (0, C.jsx)("span", {
                            className: ne <= ie ? "complete" : ""
                        }, ne))
                    }), (0, C.jsx)("h3", {
                        children: vl[ie][0]
                    }), (0, C.jsx)("p", {
                        children: vl[ie][1]
                    }), (0, C.jsx)("div", {
                        className: "tutorial-cards",
                        children: vl[ie][2].map(U => (0, C.jsx)("button", {
                            className: "playing-card " + (["H", "D"].includes(U.suit) ? "red " : "") + (ee === U.id ? "selected" : ""),
                            onClick: () => {
                                vl[ie][3] === "any" || U.id === vl[ie][3] ? (te(U.id), on.current?.play()) : xe("Try again: follow the instruction above the cards.")
                            },
                            children: (0, C.jsx)(B2, {
                                card: U
                            })
                        }, U.id))
                    }), ee ? (0, C.jsxs)("p", {
                        className: "lesson-feedback",
                        children: [(0, C.jsx)(pa, {
                            size: 20
                        }), vl[ie][4]]
                    }) : (0, C.jsx)("p", {
                        className: "muted",
                        children: "\u2191 Tap a card to try it."
                    }), (0, C.jsxs)("button", {
                        className: "gold-button",
                        disabled: !ee,
                        onClick: () => {
                            ie === 6 ? (c("Play against AI"), g(1), Ue(!0)) : (fe(ie + 1), te(""), Q())
                        },
                        children: [ie === 6 ? "Take a practice seat" : "Next lesson", (0, C.jsx)(Li, {
                            size: 18
                        })]
                    })]
                }), r === "statistics" && (0, C.jsx)("div", {
                    className: "statistics",
                    children: M ? (0, C.jsx)("p", {
                        children: "Loading your games\u2026"
                    }) : Object.keys(Rn).length ? Object.entries(Rn).map(([U, ne]) => (0, C.jsxs)("div", {
                        className: "stat-player",
                        children: [(0, C.jsx)("h3", {
                            children: U
                        }), (0, C.jsxs)("div", {
                            className: "stat-grid",
                            children: [(0, C.jsxs)("div", {
                                children: [(0, C.jsx)("strong", {
                                    children: ne.games
                                }), (0, C.jsx)("small", {
                                    children: "Games played"
                                })]
                            }), (0, C.jsxs)("div", {
                                children: [(0, C.jsx)("strong", {
                                    children: ne.games - ne.loss
                                }), (0, C.jsx)("small", {
                                    children: "Times safe"
                                })]
                            }), (0, C.jsxs)("div", {
                                children: [(0, C.jsx)("strong", {
                                    children: ne.loss
                                }), (0, C.jsx)("small", {
                                    children: "Times Kazhutha"
                                })]
                            }), (0, C.jsxs)("div", {
                                children: [(0, C.jsxs)("strong", {
                                    children: [(ne.loss / ne.games * 100).toFixed(1), "%"]
                                }), (0, C.jsx)("small", {
                                    children: "Kazhutha rate"
                                })]
                            }), (0, C.jsxs)("div", {
                                children: [(0, C.jsx)("strong", {
                                    children: (ne.positions / ne.games).toFixed(1)
                                }), (0, C.jsx)("small", {
                                    children: "Average finish"
                                })]
                            }), (0, C.jsxs)("div", {
                                children: [(0, C.jsx)("strong", {
                                    children: ne.streak
                                }), (0, C.jsx)("small", {
                                    children: "Safe streak"
                                })]
                            }), (0, C.jsxs)("div", {
                                children: [(0, C.jsx)("strong", {
                                    children: ne.cards
                                }), (0, C.jsx)("small", {
                                    children: "Cards played"
                                })]
                            }), (0, C.jsxs)("div", {
                                children: [(0, C.jsx)("strong", {
                                    children: ne.vettu
                                }), (0, C.jsx)("small", {
                                    children: "Vettus"
                                })]
                            })]
                        }), (0, C.jsx)("h4", {
                            children: "Little victories"
                        }), (0, C.jsx)("div", {
                            className: "achievements",
                            children: [
                                ["Not Today", "Avoid Kazhutha 5 games in a row", ne.streak >= 5],
                                ["Vettu Master", "Perform 25 Vettus", ne.vettu >= 25],
                                ["Kazhutha Legend", "Become Kazhutha 10 times", ne.loss >= 10],
                                ["\u0D06\u0D31\u0D41 \u0D2A\u0D47\u0D7C, \u0D12\u0D30\u0D41 \u0D15\u0D34\u0D41\u0D24", "Finish a six-player match", ne.six]
                            ].map(([Me, pt, ct]) => (0, C.jsxs)("div", {
                                className: ct ? "unlocked" : "",
                                children: [(0, C.jsx)(qf, {
                                    size: 20
                                }), (0, C.jsxs)("span", {
                                    children: [(0, C.jsx)("b", {
                                        children: Me
                                    }), (0, C.jsx)("small", {
                                        children: pt
                                    })]
                                }), ct && (0, C.jsx)(pa, {
                                    size: 16
                                })]
                            }, Me))
                        })]
                    }, U)) : (0, C.jsxs)("div", {
                        className: "empty-stats",
                        children: [(0, C.jsx)(Gr, {
                            size: 38
                        }), (0, C.jsx)("h3", {
                            children: "Your first story is still to come."
                        }), (0, C.jsx)("p", {
                            children: "Finish a game to start your statistics. Practice games don\u2019t count."
                        }), (0, C.jsxs)("button", {
                            className: "gold-button",
                            onClick: () => Ue(!1),
                            children: ["Take a seat ", (0, C.jsx)(Li, {
                                size: 17
                            })]
                        })]
                    })
                }), r === "exit" && (0, C.jsxs)("div", {
                    className: "exit-actions",
                    children: [(0, C.jsx)("button", {
                        className: "gold-button",
                        onClick: () => s(""),
                        children: "Cancel"
                    }), (0, C.jsx)("button", {
                        className: "subtle-button",
                        onClick: ln,
                        children: "Exit Game"
                    })]
                })]
            })
        })]
    })
}