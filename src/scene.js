function Ib({
    view: t,
    menu: e,
    environment: n,
    cameraMode: a,
    dealing: i = !1,
    motion: r = !0,
    onPositions: s
}) {
    let o = (0, gl.useRef)(null),
        l = (0, gl.useRef)({
            view: t,
            menu: e,
            environment: n,
            cameraMode: a,
            motion: r,
            dealing: i
        }),
        [u, f] = (0, gl.useState)(!1);
    return l.current = {
        view: t,
        menu: e,
        environment: n,
        cameraMode: a,
        motion: r,
        dealing: i
    }, (0, gl.useEffect)(() => {
        if (!o.current) return;
        let d = o.current,
            c;
        try {
            c = new Ax({
                alpha: !0,
                antialias: !0,
                powerPreference: "high-performance"
            })
        } catch {
            f(!0);
            return
        }
        c.setPixelRatio(Math.min(devicePixelRatio, 1.7)), c.shadowMap.enabled = !0, c.shadowMap.type = Pg, c.outputColorSpace = Gn, c.toneMapping = qd, c.toneMappingExposure = 1.25, d.appendChild(c.domElement);
        let p = new Id,
            g = new oa(42, 1, .1, 100);
        g.position.set(0, 7, 10), p.add(new Hd(16769973, 2108708, 2.1));
        let y = new xc(16767132, 3.5);
        y.position.set(-3, 9, 5), y.castShadow = !0, y.shadow.mapSize.set(2048, 2048), y.shadow.camera.left = -10, y.shadow.camera.right = 10, y.shadow.camera.top = 10, y.shadow.camera.bottom = -10, y.shadow.normalBias = .03, p.add(y);
        let m = new xc(8101286, 1.8);
        m.position.set(5, 4, -6), p.add(m);
        let h = document.createElement("canvas");
        h.width = 512, h.height = 512;
        let x = h.getContext("2d");
        x.fillStyle = "#462619", x.fillRect(0, 0, 512, 512);
        for (let de = 0; de < 1800; de++) {
            let Pe = Math.random() * 512;
            x.strokeStyle = `rgba(${Math.random()>.5?"156,94,46":"16,8,5"},${Math.random()*.19})`, x.lineWidth = Math.random() * 3, x.beginPath(), x.moveTo(0, Pe), x.bezierCurveTo(160, Pe + Math.sin(Pe) * 9, 360, Pe - Math.sin(Pe) * 9, 512, Pe + 3), x.stroke()
        }
        let _ = new ul(h);
        _.colorSpace = Gn;
        let v = (de, Pe = .75) => new is({
                color: de,
                roughness: Pe
            }),
            b = (de, Pe, Ve = 0, we = 0, dt = 0, nt = p) => {
                let ht = new ua(de, Pe);
                return ht.position.set(Ve, we, dt), ht.castShadow = !0, ht.receiveShadow = !0, nt.add(ht), ht
            },
            w = new Sa;
        p.add(w), w.scale.x = 1.38, b(new Wi(3.25, 3.3, .23, 96), new is({
            map: _,
            roughness: .37
        }), 0, -.14, 0, w);
        let L = document.createElement("canvas");
        L.width = 256, L.height = 256;
        let S = L.getContext("2d");
        S.fillStyle = "#163f35", S.fillRect(0, 0, 256, 256);
        for (let de = 0; de < 14e3; de++) S.fillStyle = `rgba(190,220,190,${Math.random()*.045})`, S.fillRect(Math.random() * 256, Math.random() * 256, 1, 1);
        let A = new ul(L);
        A.wrapS = A.wrapT = oc, A.repeat.set(5, 5), A.colorSpace = Gn;
        let E = b(new Wi(2.97, 2.97, .025, 96), new is({
                map: A,
                roughness: .96
            }), 0, -.008, 0, w),
            I = b(new Bd(3.03, .012, 8, 96), v(12427621, .45), 0, .004, 0, w);
        I.rotation.x = Math.PI / 2;
        for (let de of [-2, 2])
            for (let Pe of [-1.8, 1.8]) b(new Wi(.11, .08, 2.3, 12), v(3613207), de, -1.3, Pe, w);
        let D = new Sa;
        p.add(D);
        let O = [],
            P = [],
            H = new mc(1, 20, 16),
            q = (de, Pe) => {
                let Ve = de / Pe * Math.PI * 2,
                    we = new X(Math.sin(Ve) * 4.25, 0, Math.cos(Ve) * 3.15);
                P.push(we);
                let dt = new Sa;
                dt.position.copy(we), dt.rotation.y = Ve + Math.PI, D.add(dt);
                let nt = v([9986631, 11828052, 8409656, 11104592, 9723973, 12487525][de]),
                    ht = v(g5[de]);
                b(new bi(1.05, 1.2, .14), v(4138522), 0, -.1, -.38, dt), b(new bi(1.05, .12, .8), v(4993313), 0, -.64, 0, dt), b(H, ht, 0, .13, 0, dt).scale.set(.48, .7, .29), b(new Wi(.13, .15, .25, 14), nt, 0, .86, 0, dt);
                let Lt = new Sa;
                Lt.position.set(0, 1.16, .025), dt.add(Lt), b(H, nt, 0, 0, 0, Lt).scale.set(.28, .36, .27), b(new mc(.289, 20, 16, 0, Math.PI * 2, 0, Math.PI * .58), v(1906194), 0, .07, -.025, Lt).scale.set(1, 1.17, 1);
                for (let k of [-.103, .103]) b(H, v(1576973), k, .025, .251, Lt).scale.set(.022, .017, .008), b(H, nt, k > 0 ? .285 : -.285, 0, 0, Lt).scale.set(.05, .09, .047);
                b(H, nt, 0, -.045, .26, Lt).scale.set(.047, .069, .051);
                let N = b(new bi(.09, .013, .012), v(5583395), 0, -.155, .241, Lt);
                if (de === 0 || de === 3) {
                    let k = b(new bi(.12, .027, .014), v(2431250), 0, -.105, .252, Lt)
                }
                const arms = [];
                for (const side of [-1, 1]) {
                    const arm = new Sa;
                    arm.position.set(side * .40, .50, .02);
                    dt.add(arm); arms.push(arm);
                    const segment = (from, to, radius, material) => {
                        const start = new X(...from), end = new X(...to);
                        const direction = end.clone().sub(start);
                        const mesh = b(new Wi(radius * .87, radius, direction.length(), 12), material, 0, 0, 0, arm);
                        mesh.position.copy(start.clone().add(end).multiplyScalar(.5));
                        mesh.quaternion.setFromUnitVectors(new X(0,1,0), direction.normalize());
                    };
                    const elbow = [side * .09, -.27, .26];
                    const wrist = [-side * .14, -.36, .64];
                    segment([0,0,0], elbow, .13, ht);
                    b(H, nt, ...elbow, arm).scale.set(.09,.09,.09);
                    segment(elbow,wrist,.085,nt);
                    const hand = new Sa;
                    hand.position.set(...wrist); arm.add(hand);
                    b(H,nt,0,0,.065,hand).scale.set(.092,.042,.12);
                    for(let finger=0;finger<4;finger++) {
                        const x=(finger-1.5)*.042, length=[.10,.13,.12,.09][finger];
                        const fingerMesh=b(new cl(.019,length,3,8),nt,x,-.006,.15+length*.25,hand);
                        fingerMesh.rotation.x=Math.PI/2+.18;
                    }
                    const thumb=b(new cl(.025,.095,3,8),nt,-side*.085,-.006,.07,hand);
                    thumb.rotation.x=Math.PI/2;thumb.rotation.z=-side*.7;
                }
                dt.userData = {
                    head: Lt,
                    arms,
                    base: we.clone(),
                    index: de
                }, O.push(dt)
            },
            F = new Map,
            Z = new Map,
            W = de => {
                let Pe = de?.id || "back";
                if (Z.has(Pe)) return Z.get(Pe);
                let Ve = document.createElement("canvas");
                Ve.width = 256, Ve.height = 360;
                let we = Ve.getContext("2d");
                if (we.fillStyle = de ? "#f4f0e3" : "#16483e", we.fillRect(0, 0, 256, 360), we.strokeStyle = de ? "#d9d0ba" : "#c6ac70", we.lineWidth = 3, we.strokeRect(8, 8, 240, 344), de)
                    if (we.fillStyle = ["H", "D"].includes(de.suit) ? "#ac352c" : "#172b28", we.font = "bold 42px Georgia", we.fillText(po(de.rank), 18, 51), we.font = "36px Georgia", we.fillText(ei[de.suit], 19, 86), we.save(), we.translate(256, 360), we.rotate(Math.PI), we.font = "bold 42px Georgia", we.fillText(po(de.rank), 18, 51), we.font = "36px Georgia", we.fillText(ei[de.suit], 19, 86), we.restore(), we.textAlign = "center", de.rank >= 11) we.font = "88px Georgia", we.fillText(po(de.rank), 128, 187), we.font = "48px Georgia", we.fillText(ei[de.suit], 128, 249);
                    else if (de.rank === 14 || de.rank === 2) we.font = "102px Georgia", we.fillText(ei[de.suit], 128, 220);
                else
                    for (let nt = 0; nt < de.rank; nt++) we.font = "40px Georgia", we.fillText(ei[de.suit], de.rank <= 3 ? 128 : 84 + nt % 2 * 88, 115 + Math.floor(nt / (de.rank <= 3 ? 1 : 2)) * 38);
                else {
                    for (let nt = 22; nt < 250; nt += 18)
                        for (let ht = 24; ht < 344; ht += 18) we.strokeStyle = "#d0b47a66", we.strokeRect(nt, ht, 9, 9);
                    we.fillStyle = "#173f36", we.fillRect(46, 145, 164, 65), we.fillStyle = "#d9be87", we.textAlign = "center", we.font = "22px Georgia", we.fillText("KAZHUTHA", 128, 184)
                }
                let dt = new ul(Ve);
                return dt.colorSpace = Gn, dt.anisotropy = c.capabilities.getMaxAnisotropy(), Z.set(Pe, dt), dt
            },
            G = new bi(.58, .014, .82),
            ae = new fl(.573, .812),
            ge = v(15065034, .65),
            me = (de, Pe) => {
                let Ve = F.get(de);
                if (Ve) return Ve;
                Ve = new Sa;
                let we = b(G, ge, 0, 0, 0, Ve),
                    dt = b(ae, new is({
                        map: W(Pe),
                        roughness: .55
                    }), 0, .008, 0, Ve);
                return dt.rotation.x = -Math.PI / 2, Ve.position.set(0, .5, 0), p.add(Ve), F.set(de, Ve), Ve
            },
            Ke = new Sa;
        Ke.position.set(3.65, .05, 1.05), p.add(Ke), b(new Wi(.21, .17, .36, 24), new Fd({
            color: 14533793,
            transparent: !0,
            opacity: .38,
            roughness: .08,
            metalness: .1
        }), 0, .17, 0, Ke), b(new Wi(.181, .16, .24, 24), v(9126422, .18), 0, .13, 0, Ke), b(new Wi(.31, .31, .025, 32), v(13086071), 0, -.012, 0, Ke);
        let Ee = "",
            Ye = 0,
            $ = 0,
            J = !1,
            oe = 0,
            xe = 0,
            ue = !1,
            Re = [],
            tt = () => {
                let de = d.clientWidth,
                    Pe = d.clientHeight;
                c.setSize(de, Pe), g.aspect = de / Pe, g.updateProjectionMatrix(), Ee = ""
            },
            Qe = new ResizeObserver(tt);
        Qe.observe(d), tt();

        function at(de) {
            if (J || ($ = requestAnimationFrame(at), de - oe < 1e3 / 60)) return;
            let Pe = Math.min((de - oe) / 1e3, .06) || .016;
            oe = de, Ye++;
            let {
                view: Ve,
                menu: we,
                cameraMode: dt,
                environment: nt,
                motion: ht
            } = l.current, B = Ve?.players.length || 6, Lt = Ve?.viewer || 0, Rt = B + ":" + Lt + ":" + we + ":" + dt + ":" + d.clientWidth, R = dt === "Table View" ? new X(0, 12, .1) : dt === "Cinematic" ? new X(2.2, 6.5, 9.6) : new X(0, 6.5, 9.7);
            if (d.clientWidth < 650 && R.multiplyScalar(1.38), g.position.lerp(R, .055), g.lookAt(we ? -.4 : 0, 0, -.15), Rt !== Ee) {
                O.forEach(N => {
                    D.remove(N), N.traverse(k => {
                        k instanceof ua && k.geometry !== H && k.geometry.dispose()
                    })
                }), O.length = 0, P.length = 0;
                for (let N = 0; N < B; N++) q(N, B);
                Ee = Rt
            }
            O.forEach((N, k) => {
                N.visible = k !== 0;
                let K = (k + Lt) % B,
                    ie = Ve?.currentPlayer === K,
                    fe = Ve?.safePlayers.includes(K);
                N.scale.setScalar(fe ? .95 : 1), N.userData.head.rotation.y = ht ? Math.sin(de * 35e-5 + k) * .12 : 0, N.userData.head.rotation.x = ht ? (ie ? .11 : .18) + Math.sin(de * 8e-4 + k) * .025 : .16, N.position.y = ht ? Math.sin(de * .001 + k) * .007 : 0;
                let ee = ht && Ve?.lastEvent?.player === K && Ve?.lastEvent?.type === "play",
                    te = N.userData.arms[1];
                te && (te.rotation.x = _x.lerp(te.rotation.x, ee ? -.07 : 0, .06))
            }), (Ye % 20 === 0 || Ye < 3) && (Re = O.map((N, k) => {
                let K = N.position.clone();
                return K.y = 1.85, K.project(g), {
                    x: (K.x + 1) * 50,
                    y: (1 - K.y) * 50
                }
            }), s(Re));
            let M = new Map;
            if (l.current.dealing && Ve) {
                ue || (xe = de), ue = !0;
                let N = Math.max(0, (de - xe - 350) / 32);
                for (let k = 0; k < 52; k++) {
                    let K = (k % B - Lt + B) % B,
                        ie = K / B * Math.PI * 2,
                        fe = Math.floor(k / B),
                        ee = k < N;
                    M.set("deal" + k, {
                        position: ee ? new X(Math.sin(ie) * 3.13 + Math.cos(ie) * fe * .025, .06 + fe * .017, Math.cos(ie) * 2.43 - Math.sin(ie) * fe * .025) : new X(Math.sin(de * .026 + k * .08) * .13, .08 + k * .014, 0),
                        rotation: ee ? -ie : Math.sin(de * .013) * .1,
                        card: null
                    })
                }
            } else if (Ve) ue = !1, Ve.trick.forEach((N, k) => {
                let K = (N.player - Lt + B) % B,
                    ie = K / B * Math.PI * 2;
                M.set(N.card.id, {
                    position: new X(Math.sin(ie) * .85, .035 + k * .018, Math.cos(ie) * .65),
                    rotation: -ie + .06 * Math.sin(k * 7),
                    card: N.card
                })
            }), Ve.counts.forEach((N, k) => {
                let K = (k - Lt + B) % B;
                if (K === 0) return;
                let ie = K / B * Math.PI * 2;
                for (let fe = 0; fe < Math.min(N, 8); fe++) M.set("hand" + k + "-" + fe, {
                    position: new X(Math.sin(ie) * 3.13 + Math.cos(ie) * (fe - Math.min(N, 8) / 2) * .1, .07 + fe * .017, Math.cos(ie) * 2.43 - Math.sin(ie) * (fe - Math.min(N, 8) / 2) * .1),
                    rotation: -ie,
                    card: null
                })
            });
            else {
                [{
                    id: "S14",
                    suit: "S",
                    rank: 14
                }, {
                    id: "H12",
                    suit: "H",
                    rank: 12
                }, {
                    id: "C10",
                    suit: "C",
                    rank: 10
                }].forEach((N, k) => M.set(N.id, {
                    position: new X((k - 1) * .75, .035 + k * .018, 0),
                    rotation: (k - 1) * .15,
                    card: N
                }));
                for (let N = 1; N < 6; N++)
                    for (let k = 0; k < 5; k++) {
                        let K = N / 6 * Math.PI * 2;
                        M.set("demo" + N + k, {
                            position: new X(Math.sin(K) * 3.15 + Math.cos(K) * k * .09, .05 + k * .017, Math.cos(K) * 2.43 - Math.sin(K) * k * .09),
                            rotation: -K,
                            card: null
                        })
                    }
            }
            M.forEach((N, k) => {
                let K = F.has(k),
                    ie = me(k, N.card);
                if (!K && Ve) {
                    let fe = Ve.trick.find(re => re.card.id === k),
                        ee = fe ? (fe.player - Lt + B) % B : 0,
                        te = ee / B * Math.PI * 2;
                    ie.position.set(Math.sin(te) * 3.1, .4, Math.cos(te) * 2.4)
                }
                ie.visible = !0, ie.position.lerp(N.position, ht ? 1 - Math.exp(-Pe * 9) : 1), ie.rotation.y = _x.lerp(ie.rotation.y, N.rotation, .17)
            }), F.forEach((N, k) => {
                M.has(k) || (ht && N.visible ? (N.position.lerp(new X(2.4, -.05, -1.4), .18), N.position.distanceTo(new X(2.4, -.05, -1.4)) < .12 && (N.visible = !1)) : N.visible = !1)
            }), E.material.color.set(nt === "Minimal Tournament Room" ? 7576221 : nt === "Tea Shop" ? 12824187 : 16777215), y.intensity = nt === "Monsoon Evening" ? 2.3 : 3.5, c.render(p, g)
        }
        return $ = requestAnimationFrame(at), () => {
            J = !0, cancelAnimationFrame($), Qe.disconnect(), p.traverse(de => {
                if (de instanceof ua) {
                    de.geometry.dispose();
                    for (let Pe of Array.isArray(de.material) ? de.material : [de.material]) Pe.dispose()
                }
            }), Z.forEach(de => de.dispose()), _.dispose(), A.dispose(), c.dispose(), d.replaceChildren()
        }
    }, []), (0, Rb.jsx)("div", {
        className: "scene " + (e ? "scene-menu" : ""),
        ref: o,
        "aria-hidden": "true",
        children: u && (0, Rb.jsx)("div", {
            className: "scene-fallback",
            children: "3D is unavailable on this device. All card controls still work."
        })
    })
}