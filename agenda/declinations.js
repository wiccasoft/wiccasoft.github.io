
//http://www.internetsv.info/MoonCalc.html

function doCalcs(d) {
   	var g, days,t ,L1, M1, C1, V1, Ec1, R1, Th1, Om1, Lam1, Obl, Ra1, Dec1;
	var F, L2, Om2, M2, D, R2, R3, Bm, Lm, HLm, HBm, Ra2, Dec2, EL, EB, W, X, Y, A; 
	var Co, SLt, Psi, Il, K, P1, P2, y, m, d, bit, h, min, bk;
//
//	Get date and time code from user, isolate the year, month, day and hours
//	and minutes, and do some basic error checking! This only works for AD years.
//
    //g = form.num.value;

    y = d.getFullYear()
    m = d.getMonth()+1
    d = d.getDate()

    console.log(y+"-"+m+"-"+d)

    var now = new Date();

    h = now.getHours()
    min = now.getMinutes()
    /*
   	y = Math.floor(g / 10000);
   	m = Math.floor( (g - y*10000) / 100);
   	d = Math.floor(g - y*10000 - m*100 );
   	bit = (g - Math.floor(g))*100;
   	h = Math.floor(bit);
   	min = Math.floor(bit*100 - h * 100 + 0.5);
   	*/
//
//	Primative error checking - accounting for right number of
//	days per month including leap years. Using bk variable to 
//	prevent multiple alerts. See functions isleap(y) 
//	and goodmonthday (y, m, d).
//
	bk = 0;

/*	
	if(g < 16000000) {	
		bk = 1;
		alert("Routines are not accurate enough to work back that" + 
               " far - answers are meaningless!");
		}
	if(g > 23000000) {
		bk = 1;	
		alert("Routines are not accurate enough to work far into the future" + 
               " - answers are meaningless!");
		}	
	if( ((m<1) || (m>12)) && (bk !=1)) {
			bk = 1;
			alert("Months are not right - type date again");
			}
	if((goodmonthday(y, m, d) ==0) && (bk !=1)) {
			bk = 1;
			alert("Wrong number of days for the month or not a leap year - type date again");
			}
	if ((h>23) && (bk != 1)) {
			bk = 1;
			alert("Hours are not right - type date again");
			}
	if((min>59) && (bk !=1)) {
			alert("Minutes are not right - type date again");
			}
			*/
//
//	Get the number of days since J2000.0 using day2000() function.
//
    days = day2000(y, m, d, h + min/60);
	t = days / 36525;

//
//	Sun formulas:
//
//	L1	- Mean longitude
//	M1	- Mean anomaly
//	C1	- Equation of centre
//	V1	- True anomaly
//	Ec1	- Eccentricity 
//	R1	- Sun distance
//	Th1	- Theta (true longitude)
//	Om1	- Long Asc Node (Omega)
//	Lam1- Lambda (apparent longitude)
//	Obl	- Obliquity of ecliptic
//	Ra1	- Right Ascension
//	Dec1- Declination
//

	L1 = range(280.466 + 36000.8 * t);
	M1 = range(357.529+35999*t - 0.0001536* t*t + t*t*t/24490000);

	C1 = (1.915 - 0.004817* t - 0.000014* t * t)* dsin(M1);	 
	C1 = C1 + (0.01999 - 0.000101 * t)* dsin(2*M1);
	C1 = C1 + 0.00029 * dsin(3*M1);
	V1 = M1 + C1;
	Ec1 = 0.01671 - 0.00004204 * t - 0.0000001236 * t*t;
	R1 = 0.99972 / (1 + Ec1 * dcos(V1));
	Th1 = L1 + C1;
	Om1 = range(125.04 - 1934.1 * t);
	Lam1 = Th1 - 0.00569 - 0.00478 * dsin(Om1);
	Obl = (84381.448 - 46.815 * t)/3600;
	Ra1 = datan2(dsin(Th1) * dcos(Obl) - dtan(0)* dsin(Obl), dcos(Th1));
	Dec1 = dasin(dsin(0)* dcos(Obl) + dcos(0)*dsin(Obl)*dsin(Th1));

//
//	Moon formulas:
//
//	F 	- Argument of latitude (F)
//	L2 	- Mean longitude (L')
//	Om2 - Long. Asc. Node (Om')
//	M2	- Mean anomaly (M')
//	D	- Mean elongation (D)
//	D2	- 2 * D
//	R2	- Lunar distance (Earth - Moon distance)
//	R3	- Distance ratio (Sun / Moon)
//	Bm	- Geocentric Latitude of Moon
//	Lm	- Geocentric Longitude of Moon
//	HLm	- Heliocentric longitude
//	HBm	- Heliocentric latitude
//	Ra2	- Lunar Right Ascension
//	Dec2- Declination
//

	F = range(93.2721 + 483202 * t - 0.003403 * t* t - t * t * t/3526000);
	L2 = range(218.316 + 481268 * t);
	Om2 = range(125.045 - 1934.14 * t + 0.002071 * t * t + t * t * t/450000);
	M2 = range(134.963 + 477199 * t + 0.008997 * t * t + t * t * t/69700);
	D = range(297.85 + 445267 * t - 0.00163 * t * t + t * t * t/545900);
	D2 = 2*D;
	R2 = 1 + (-20954 * dcos(M2) - 3699 * dcos(D2 - M2) - 2956 * dcos(D2)) / 385000;
	R3 = (R2 / R1) / 379.168831168831;
	Bm = 5.128 * dsin(F) + 0.2806 * dsin(M2 + F);
	Bm = Bm + 0.2777 * dsin(M2 - F) + 0.1732 * dsin(D2 - F);
	Lm = 6.289 * dsin(M2) + 1.274 * dsin(D2 -M2) + 0.6583 * dsin(D2); 
	Lm = Lm + 0.2136 * dsin(2*M2) - 0.1851 * dsin(M1) - 0.1143 * dsin(2 * F); 
	Lm = Lm +0.0588 * dsin(D2 - 2*M2) 
	Lm = Lm + 0.0572* dsin(D2 - M1 - M2) + 0.0533* dsin(D2 + M2);
	Lm = Lm + L2;
	Ra2 = datan2(dsin(Lm) * dcos(Obl) - dtan(Bm)* dsin(Obl), dcos(Lm));
	Dec2 = dasin(dsin(Bm)* dcos(Obl) + dcos(Bm)*dsin(Obl)*dsin(Lm));
	HLm = range(Lam1 + 180 + (180/Math.PI) * R3 * dcos(Bm) * dsin(Lam1 - Lm));
	HBm = R3 * Bm;


//
//	Selenographic coordinates of the sub Earth point.
//	This gives you the (geocentric) libration 
//	approximating to that listed in most almanacs
//	Topocentric libration can be up to a degree
//	different either way.
//
//	Physical libration ignored, as is nutation.
//
//	I	- Inclination of (mean) lunar orbit to ecliptic
//	EL	- Selenographic longitude of sub Earth point
//	EB	- Sel Lat of sub Earth point
//	W	- angle variable
//	X	- Rectangular coordinate
//	Y	- Rectangular coordinate
//	A	- Angle variable (see Meeus ch 51 for notation)
//
	I = 1.54242;
	W = Lm - Om2;
	Y = dcos(W) * dcos(Bm);
	X = dsin(W) * dcos(Bm) * dcos(I) - dsin(Bm) * dsin(I);
	A = datan2(X, Y);
	EL = A - F;
	EB = dasin(-dsin(W) * dcos(Bm) * dsin(I) - dsin(Bm) * dcos(I));

//
//	Selenographic coordinates of sub-solar point. This point is
//	the 'pole' of the illuminated hemisphere of the Moon
//  and so describes the position of the terminator on the 
//  lunar surface. The information is communicated through
//	numbers like the colongitude, and the longitude of the
//	terminator.
//
//	SL	- Sel Long of sub-solar point
//	SB	- Sel Lat of sub-solar point
//	W, Y, X, A	- temporary variables as for sub-Earth point
//	Co	- Colongitude of the Sun
//	SLt	- Selenographic longitude of terminator 
//	riset - Lunar sunrise or set
//

	W = range(HLm - Om2);
	Y = dcos(W) * dcos(HBm);
	X = dsin(W) * dcos(HBm) * dcos(I) - dsin(HBm) * dsin(I);
	A = datan2(X, Y);
	SL = range(A - F);
	SB = dasin(-dsin(W) * dcos(HBm) * dsin(I) - dsin(HBm) * dcos(I));

	if (SL < 90) {
		Co = 90 - SL;
			}
	else	{
		Co = 450 - SL;
			}

	if ((Co > 90) && (Co < 270)) {
		SLt = 180 - Co;
			}
	else	{
		if	(Co < 90) {
			SLt = 0 - Co;
			}
		else	{
			SLt = 360 - Co;
				}
			}

//
//	Calculate the illuminated fraction, the position angle of the bright
//	limb, and the position angle of the Moon's rotation axis. All position
//	angles relate to the North Celestial Pole - you need to work out the
//  'Parallactic angle' to calculate the orientation to your local zenith.
//

//	Iluminated fraction
	A = dcos(Bm) * dcos(Lm - Lam1);
	Psi = 90 - datan(A / Math.sqrt(1- A*A));
	X = R1 * dsin(Psi);
	Y = R3 - R1* A;
	Il = datan2(X, Y);
	K = (1 + dcos(Il))/2;

//	PA bright limb
	X = dsin(Dec1) * dcos(Dec2) - dcos(Dec1) * dsin(Dec2) * dcos(Ra1 - Ra2);
	Y = dcos(Dec1) * dsin(Ra1 - Ra2);
	P1 = datan2(Y, X);

//	PA Moon's rotation axis
//	Neglects nutation and physical libration, so Meeus' angle
//	V is just Om2
	X = dsin(I) * dsin(Om2);
	Y = dsin(I) * dcos(Om2) * dcos(Obl) - dcos(I) * dsin(Obl);
	W = datan2(X, Y);
	A = Math.sqrt(X*X + Y*Y) * dcos(Ra2 - W);
	P2 = dasin(A / dcos(EB));			



console.log(round(Dec1, 2))
console.log(round(Dec2, 2))
return [round(Dec1, 2),round(Dec2, 2)]
//
//	Write Sun numbers to form.
//
/*
   	form.daynumber.value = round(days, 4);
   	form.julday.value = round(days + 2451545.0, 4);
	form.SunDistance.value = round(R1, 4);
	form.SunRa.value = round(Ra1 / 15, 3);
	form.SunDec.value = round(Dec1, 2);

//
//	Write Moon numbers to form.
//

	form.MoonDist.value = round(R2 * 60.268511, 2);
	form.MoonRa.value = round(Ra2 / 15, 3);
	form.MoonDec.value = round(Dec2, 2);

//
//	Print the libration numbers.
//

	form.SelLatEarth.value = round(EB , 1);
	form.SelLongEarth.value = round(EL, 1);

//
//	Print the Sub-solar numbers.
//

	form.SelLatSun.value = round(SB , 1);
	form.SelLongSun.value = round(SL, 1);
	form.SelColongSun.value = round(Co, 2);
	form.SelLongTerm.value = round(SLt, 1);

//
//	Print the rest - position angles and illuminated fraction.
//

	form.SelIlum.value = round(K, 3);
	form.SelPaBl.value = round(P1, 1);
	form.SelPaPole.value = round(P2, 1);
	*/
   }

//
// This is the usual days since J2000 function.
//

   function day2000(y, m, d, h) {
   var d1, b, c, greg;
   greg = y*10000 + m*100 + d;
    if (m == 1 || m == 2) {
	   y = y - 1;
	   m = m + 12;
     }
//  Reverts to Julian calendar before 4th Oct 1582.
//  No good for UK, America or Sweeden!

   if (greg > 15821004) {
       a = Math.floor(y/100);
       b = 2 - a  + Math.floor(a/4) }
   else {
       b = 0;
     }
   c = Math.floor(365.25 * y);
   d1 = Math.floor(30.6001 * (m + 1));
   return (b + c + d1 -730550.5 + d + h/24);
    } 

//
//	Leap year detecting function (gregorian calendar)
//  returns 1 for leap year and 0 for non-leap year.
//

function isleap(y) {
	var a;
//	assume not a leap year...
	a = 0;
//	...flag leap year candidates...
	if (y % 4 == 0) a = 1;
//	...if year is a century year then not leap...
	if (y % 100 ==0 ) a = 0;
//	...except if century year divisible by 400...
	if (y % 400 == 0) a = 1;
//	...and so done according to Gregory's wishes 
	return a;
	}

//
//	Month and day number checking function
//	This will work OK for Julian or Gregorian
//	providing isleap() is defined appropriately
//	Returns 1 if Month and Day combination OK,
//	and 0 if month and day combination impossible.
//
function goodmonthday(y, m, d) {
	var a, leap;
	leap = isleap(y); 
//	assume OK
	a = 1;
//	first deal with zero day number!
	if (d == 0) a = 0;
//	Sort Feburary next
	if ((m==2) && (leap ==1) && (d > 29)) a= 0;
	if ((m==2) && (d > 28) && (leap ==0))	a = 0;
//	then the rest of the months - 30 days...
	if(((m==4) || (m == 6) || (m == 9) || (m==11)) && d > 30) a = 0;
//	...31 days...	
	if (d > 31) a = 0;
//	...and so done.
	return a;
	}	

//
// Trigonometric functions working in degrees - this just
// makes implementing the formulas in books easier at the
// cost of some wasted multiplications.
// The 'range' function brings angles into range 0 to 360,
// and an atan2(x,y) function returns arctan in correct
// quadrant. ipart(x) returns smallest integer nearest zero.
//

function dsin(x) {
	return Math.sin(Math.PI / 180 * x)
	}

function dcos(x) {
	return Math.cos(Math.PI / 180 * x)
	}

function dtan(x) {
	return Math.tan(Math.PI / 180 * x)
	}

function dasin(x) {
	return 180/ Math.PI * Math.asin(x)
	}

function dacos(x) {
	return 180/ Math.PI * Math.acos(x)
	}

function datan(x) {
	return 180/ Math.PI * Math.atan(x)
	}

function datan2(y, x) {
	var a;
	if ((x == 0) && (y == 0)) {
		return 0;
		}
	else	{
		a = datan(y / x);
		if (x < 0) {
			a = a + 180; 
			}
		if (y < 0 && x > 0) {
			a = a + 360;
			}
		return a;
		}
	}

function ipart(x) {
	var a;
	if (x> 0) {
	    a = Math.floor(x);
		}
	else {
		a = Math.ceil(x);
		}	
	return a;
	}

function range(x) {
	var a, b
	b = x / 360;
	a = 360 * (b - ipart(b));
	if (a  < 0 ) {
		a = a + 360
		}
	return a
	}

//
// Round rounds the number num to dp decimal places
// the second line is some C like jiggery pokery I
// found in an O'Reilly book which means if dp is null
// you get 2 decimal places.
//
   function round(num, dp) {
//   dp = (!dp ? 2: dp);
   return Math.round (num * Math.pow(10, dp)) / Math.pow(10, dp);
    }



    //doCalcs(new Date())