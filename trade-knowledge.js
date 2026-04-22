/* ============================================================
   BUDDEES TRADE KNOWLEDGE BASE
   trade-knowledge.js — loaded as a <script> tag in buddees.html

   Each trade object is structured identically so agents can
   pull from the same keys regardless of which trade is selected.

   Structure per trade:
   - meta           : id, name, short description, pain point
   - consumerLanguage : what customer says vs what tech calls it
   - jobTypes       : top jobs with pricing (for Cassie)
   - seasonal       : peak / slow / campaign triggers (for Marco)
   - intake         : first questions + emergency flags (for Tabby)
   - dispatch       : van stock highlights + red flags (for Jack)
   - marketing      : win-back angles + upsell moments (for Marco)
   - financial      : pricing tiers + deposit rules (for Cassie)
   ============================================================ */

window.BUDDEES_TRADES = {

  /* ──────────────────────────────────────────────
     HVAC
  ────────────────────────────────────────────── */
  hvac: {
    meta: {
      id: 'hvac',
      name: 'HVAC',
      fullName: 'HVAC (Heating, Ventilation & Air Conditioning)',
      shortDescription: 'HVAC technicians install, repair, and maintain heating, cooling, and ventilation systems in homes and commercial buildings. Everything from fixing a broken air conditioner in summer to installing a brand-new furnace before winter.',
      customerPainPoint: 'The customer is usually stressed and uncomfortable. It is 95 degrees outside and their AC just died, or it is freezing and the heat will not kick on. They feel urgent, maybe a little panicked, and are worried about cost and how long they will have to wait.',
      jobCompletionFeeling: 'Relief. Pure relief. When the tech leaves and the house is back to the right temperature, the homeowner feels like someone just saved the day. If it was done quickly and cleanly, they will remember that company for life.'
    },

    consumerLanguage: [
      { customerSays: 'My AC isn\'t blowing cold air', techCalls: 'Low refrigerant charge / Failed compressor / Dirty evaporator coil' },
      { customerSays: 'The unit is making a banging noise', techCalls: 'Loose blower wheel / Broken motor mount / Debris in blower' },
      { customerSays: 'My house won\'t cool down even though the AC is running', techCalls: 'Undersized system / Refrigerant leak / Dirty condenser coils / Duct leakage' },
      { customerSays: 'The AC keeps turning on and off every few minutes', techCalls: 'Short cycling — caused by oversized unit, low refrigerant, or dirty air filter' },
      { customerSays: 'There\'s ice on my AC unit outside / the pipe is frozen', techCalls: 'Refrigerant line freeze-up — caused by low charge, poor airflow, or low ambient temps' },
      { customerSays: 'Water is dripping from my ceiling / inside unit', techCalls: 'Condensate drain blockage / Clogged drain pan / Cracked evaporator drain line' },
      { customerSays: 'My heat won\'t come on', techCalls: 'Igniter failure / Faulty thermocouple / Clogged burner / Tripped limit switch' },
      { customerSays: 'There\'s a burning smell when the heat runs', techCalls: 'Dust burn-off (normal after summer) / Failed heat exchanger / Overheating motor' },
      { customerSays: 'My energy bill is way higher than normal', techCalls: 'Dirty coils / Refrigerant leak / Failed capacitor / Duct leakage / Aging system' },
      { customerSays: 'Some rooms are hot, others are cold', techCalls: 'Unbalanced duct system / Zone control failure / Blocked vents / Duct leakage' },
      { customerSays: 'The thermostat isn\'t working right', techCalls: 'Thermostat calibration error / Dead batteries / Wiring fault / Failed control board' },
      { customerSays: 'There\'s a clicking noise but it won\'t start', techCalls: 'Failed start capacitor / Relay issue / Contactor failure' },
      { customerSays: 'My vents smell musty or moldy', techCalls: 'Microbial growth in evaporator coil / Dirty drain pan / Contaminated ductwork' },
      { customerSays: 'It\'s blowing air but no heat or cool', techCalls: 'Compressor failure / Gas valve failure / Broken reversing valve (heat pump)' },
      { customerSays: 'The outside unit is running but nothing\'s happening inside', techCalls: 'Disconnected or broken ductwork / Broken air handler fan / Refrigerant loss' },
      { customerSays: 'There\'s a gas smell near my furnace', techCalls: 'Gas valve leak / Cracked heat exchanger / Loose gas fitting — treat as emergency' },
      { customerSays: 'My heat pump doesn\'t heat in winter', techCalls: 'Low refrigerant / Defrost board failure / Failed reversing valve / Auxiliary heat issue' },
      { customerSays: 'The unit runs constantly and never shuts off', techCalls: 'Undersized system / Refrigerant leak / Faulty thermostat / Extreme load condition' }
    ],

    jobTypes: [
      { name: 'AC Tune-Up / Preventive Maintenance', priceLow: 89, priceHigh: 250, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Refrigerant top-up, filter replacement, UV light installation' },
      { name: 'Thermostat Replacement', priceLow: 150, priceHigh: 500, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Smart thermostat upgrade, Wi-Fi thermostat, new wiring run' },
      { name: 'Air Filter Replacement', priceLow: 75, priceHigh: 180, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Full system tune-up, media filter upgrade, UV air purifier' },
      { name: 'Refrigerant Recharge (R-410A)', priceLow: 200, priceHigh: 600, priceType: 'T&M', complexity: 'Medium', commonUpsell: 'Leak search and repair, coil cleaning, system tune-up' },
      { name: 'Capacitor Replacement', priceLow: 150, priceHigh: 400, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Dual-run capacitor upgrade, contactor inspection, full tune-up' },
      { name: 'Contactor Replacement', priceLow: 150, priceHigh: 350, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Capacitor replacement, disconnect box inspection, full system check' },
      { name: 'Condensate Drain Line Cleaning', priceLow: 100, priceHigh: 300, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Condensate pump installation, drain pan treatment tablets, UV purifier' },
      { name: 'Blower Motor Replacement', priceLow: 400, priceHigh: 900, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Blower wheel cleaning, belt replacement, system tune-up' },
      { name: 'Furnace Repair (Igniter / Flame Sensor / Limit Switch)', priceLow: 200, priceHigh: 600, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Heat exchanger inspection, gas valve test, full furnace tune-up' },
      { name: 'Central AC System Replacement', priceLow: 5000, priceHigh: 13000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Extended warranty, smart thermostat, duct sealing, annual maintenance plan' },
      { name: 'Furnace Replacement (Gas or Electric)', priceLow: 3500, priceHigh: 10000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Smart thermostat, duct inspection, humidifier, annual maintenance plan' },
      { name: 'Heat Pump Installation or Replacement', priceLow: 5000, priceHigh: 14000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Smart thermostat, mini-split add-on, maintenance plan' },
      { name: 'Ductwork Inspection and Sealing', priceLow: 300, priceHigh: 1500, priceType: 'T&M', complexity: 'Medium', commonUpsell: 'Full duct replacement, zone dampers, energy audit' },
      { name: 'Mini-Split (Ductless) Installation', priceLow: 2000, priceHigh: 5500, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Multi-zone upgrade, smart thermostat integration, annual maintenance plan' },
      { name: 'UV Light / Air Purifier Installation', priceLow: 250, priceHigh: 800, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Media filter upgrade, whole-home humidifier, annual maintenance plan' },
      { name: 'Whole-Home Humidifier Installation', priceLow: 400, priceHigh: 1200, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Smart humidistat, annual humidifier pad replacement plan, IAQ package' },
      { name: 'Zone Control System Installation', priceLow: 1500, priceHigh: 4000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Smart thermostat per zone, duct balancing, annual maintenance plan' },
      { name: 'Evaporator Coil Replacement', priceLow: 800, priceHigh: 2000, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Full AC tune-up, refrigerant recharge, coil treatment' },
      { name: 'Condenser Coil Cleaning', priceLow: 150, priceHigh: 400, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Full AC tune-up, refrigerant check, capacitor inspection' },
      { name: 'Emergency Service Call (After-Hours)', priceLow: 250, priceHigh: 800, priceType: 'T&M + after-hours fee', complexity: 'Medium', commonUpsell: 'Next-day full tune-up, maintenance agreement, system replacement assessment' }
    ],

    seasonal: {
      peakMonths: 'June, July, August (cooling season). December and January (heating season, especially northern states). In the South (TX, FL, GA, AZ), cooling demand stays high April through September.',
      slowMonths: 'October and November (between heating and cooling seasons). Also late February to mid-March.',
      preSeasonOpportunity: 'March to May — AC tune-ups and system checks before summer heat hits. September to November — furnace inspections before winter.',
      postSeasonOpportunity: 'September / October — many homeowners deferred AC repairs during summer. Win-back angle: "Your AC worked overtime this summer. Let\'s check it now before we need it again."',
      rebookingWindow: 'Annual maintenance is standard. Most quality HVAC businesses sell a maintenance agreement — tech visits twice a year (spring cooling check and fall heating check).',
      campaigns: [
        { period: 'February–March', name: 'Wake Up Your AC', hook: 'Before the first hot day hits — get your AC checked now while techs have availability.' },
        { period: 'April–May', name: 'Beat the Rush', hook: 'Summer slots fill up fast. Lock in your AC tune-up now before the heat wave calls flood in.' },
        { period: 'June–July', name: 'Emergency Prevention', hook: 'Most breakdowns happen when it\'s hottest. A neglected system in peak summer is a breakdown waiting to happen.' },
        { period: 'August–September', name: 'Summer Wind-Down Check', hook: 'Your AC ran non-stop this summer. A quick check now catches wear before you store it for winter.' },
        { period: 'October–November', name: 'Furnace Wake-Up Call', hook: 'First cold snap is coming. Don\'t wait until it fails. Book your heating tune-up now.' },
        { period: 'December–January', name: 'Priority Winter Club', hook: 'Push maintenance agreements — become a priority member and skip the emergency queue.' }
      ]
    },

    intake: {
      firstQuestions: [
        'Is this a heating or cooling problem, and is the system completely not working or just not working well?',
        'When did this start, and do you have any children, elderly, or pets in the home?',
        'What type of system do you have — do you know if it\'s a heat pump, gas furnace, or central AC?'
      ],
      emergencyTriggers: [
        'No heat in winter with young children, elderly, or pets in the home',
        'No cooling during extreme heat (above 95°F) — especially with medical conditions',
        'Gas smell near furnace or anywhere in the home — advise them to leave and call the gas company',
        'Carbon monoxide alarm going off — evacuate immediately',
        'Water actively flooding from the HVAC unit or ceiling',
        'Burning smell from vents that is not going away (possible heat exchanger failure or electrical fire)',
        'Elderly or medically vulnerable customer alone with no heat in a winter storm',
        'Commercial property with no HVAC impacting business operations or food safety'
      ],
      commonMisunderstandings: [
        { customerSays: 'My Freon is just low', tabbyCorrects: 'Refrigerant does not get used up. If it\'s low, there\'s a leak. A simple top-up without finding the leak will just happen again.' },
        { customerSays: 'Can you just tell me how much it will cost?', tabbyCorrects: 'A tech needs to diagnose it first. A ballpark without seeing the unit is not fair to the customer.' },
        { customerSays: 'It just needs a service', tabbyCorrects: 'A tune-up is maintenance. If it\'s broken, it may need a repair call — not the same thing.' },
        { customerSays: 'My warranty should cover this', tabbyCorrects: 'Manufacturer warranties have conditions — registered on time, annual maintenance documented. We can check but cannot promise coverage until the tech looks.' },
        { customerSays: 'The other company just added Freon last year', tabbyCorrects: 'If they needed refrigerant before, there\'s likely an active leak. Flag for Jack so the tech does a full leak check, not just a recharge.' }
      ]
    },

    dispatch: {
      vanStockHighlights: [
        'Refrigerant R-410A (1 x 25lb cylinder)',
        'Capacitors — run and start, assorted 5 to 80 MFD (6–8 common sizes)',
        'Contactors — single and double pole, 24V coil, 30A and 40A (4 units)',
        'Universal hot surface igniter (2 units)',
        'Flame sensor universal (2 units)',
        'Air filters MERV 8 and MERV 11, common sizes (2 of each)',
        'Condensate drain line 3/4" PVC with elbows and couplings',
        'Digital manifold gauge set',
        'Electronic refrigerant leak detector',
        'Vacuum pump (2-stage)',
        'Refrigerant recovery machine and cylinder (EPA-compliant)',
        'Universal thermostat — 1 programmable, 1 smart Wi-Fi'
      ],
      redFlagsForSeniorTech: [
        'Any job involving a suspected heat exchanger crack — carbon monoxide risk',
        'Refrigerant leak that cannot be easily located (in coil, inside wall, or under slab)',
        'Gas pressure issues or gas valve replacement',
        'System is under 5 years old and has failed — possible warranty and installation error',
        'Commercial HVAC — rooftop units, larger tonnage, VRF systems',
        'Customer reports CO alarm went off near the furnace',
        'System replacement requiring load calculation',
        'Customer has existing dispute with a prior contractor'
      ],
      permitRequiredJobs: [
        'Full AC system replacement (condenser + air handler)',
        'Furnace replacement',
        'Heat pump installation or replacement',
        'Mini-split (ductless) installation',
        'Zone control system installation',
        'New HVAC installation in new construction or major renovation'
      ]
    },

    marketing: {
      winBackAngles: [
        { name: 'Summer Survivor Check', timing: 'September/October', message: 'Your unit worked hard this summer. A quick fall check catches anything that wore out — before you need heat.' },
        { name: 'Maintenance Gap Alert', timing: '12+ months since last service', message: 'It\'s been over a year since we checked your system. A quick tune-up now is a lot cheaper than a breakdown in July.' },
        { name: 'Refrigerant Phase-Out Alert', timing: 'Customers with R-22 systems 12+ years old', message: 'R-22 refrigerant is no longer manufactured and costs have skyrocketed. Here\'s what that means for your system.' },
        { name: 'Energy Bill Angle', timing: 'Post-repair, no upgrade yet', message: 'A dirty system can add 20% to your energy bill. A tune-up might pay for itself in the next 2 months.' },
        { name: 'New Season Reminder', timing: 'Pre-season (spring and fall)', message: 'Winter is X weeks away. Is your furnace ready? Book your heating check now before our schedule fills up.' }
      ],
      upsellMoments: [
        { moment: 'After any repair', pitch: 'Offer a maintenance agreement. The customer just experienced a breakdown — they are emotionally ready to avoid it happening again.' },
        { moment: 'After a tune-up on a system 10+ years old', pitch: 'If the tech finds wear, offer a replacement consultation. Frame it as being honest about what is coming.' },
        { moment: 'After any refrigerant work', pitch: 'Upsell an indoor air quality product — UV light, air purifier, media filter. The customer is already thinking about air quality.' }
      ],
      reviewTiming: 'Send the review request 2–4 hours after the tech leaves — not immediately, not the next day. The customer is still feeling relief. A direct text with a Google Review link works better than email.',
      referralHook: 'Refer a friend and get $50 off your next service. Time the ask right after a successful emergency job — that\'s when goodwill is at its peak.'
    },

    financial: {
      callOutFee: { low: 75, high: 250, note: 'Call-out fee is typically credited against the repair cost if the customer proceeds.' },
      afterHoursPremium: '50–100% above standard labour rate, or a flat emergency fee of $150–$250 for residential.',
      materialMarkup: '25–50% on parts is typical for residential HVAC. Never mark up below 20%.',
      paymentTerms: 'Residential: due on completion (same day). Commercial: Net 15 to Net 30.',
      depositPolicy: 'Any job over $1,500 — ask for 25–50% deposit before ordering equipment. Full system replacements ($3,500+) — 50% upfront is standard.',
      invoiceTiers: [
        { size: 'Small', rangeLow: 150, rangeHigh: 450, examples: 'Filter swap, thermostat battery, condensate unclog, basic diagnosis' },
        { size: 'Medium', rangeLow: 400, rangeHigh: 1500, examples: 'Capacitor/contactor replacement, refrigerant recharge, blower motor, furnace repair' },
        { size: 'Large', rangeLow: 1800, rangeHigh: 6000, examples: 'Evaporator coil replacement, mini-split install, zone system' },
        { size: 'Premium', rangeLow: 6000, rangeHigh: 20000, examples: 'Full system replacement, multi-zone ductless, commercial rooftop unit' }
      ],
      changeOrderTriggers: [
        'Tech discovers hidden duct damage not visible during initial scope',
        'Refrigerant leak found after recharge — original quote was recharge only',
        'Customer adds work while tech is on-site',
        'System is a different age, model, or configuration than discussed at booking',
        'Old system uses discontinued refrigerant and recovery adds time and cost'
      ]
    }
  }

  ,

  /* ──────────────────────────────────────────────
     ELECTRICIAN
  ────────────────────────────────────────────── */
  electrical: {
    meta: {
      id: 'electrical',
      name: 'Electrical',
      fullName: 'Electrician — United States',
      shortDescription: 'Electricians install, maintain, and repair electrical systems in homes and businesses — everything from wiring a new outlet to replacing a full electrical panel. They keep the power on safely and make sure everything meets code.',
      customerPainPoint: 'Customers are usually scared. Whether the power is out, they see sparks, or they are about to list a home and need a panel upgrade, they feel a mix of urgency and worry about cost. They do not know what is safe to ignore and what could start a fire.',
      jobCompletionFeeling: 'Relief and confidence. When the job is done, they want to know their home is safe, everything works, and they will not have to call again anytime soon. Trust is everything in this trade.'
    },

    consumerLanguage: [
      { customerSays: 'My lights keep flickering', techCalls: 'Loose neutral connection / overloaded circuit / failing breaker' },
      { customerSays: 'The outlet stopped working', techCalls: 'Dead receptacle — tripped GFCI, open neutral, or failed device' },
      { customerSays: 'My breaker keeps tripping', techCalls: 'Overloaded circuit / short circuit / ground fault / weak breaker' },
      { customerSays: 'I smell something burning near the wall', techCalls: 'Arcing fault / overheated wire insulation — potential fire hazard' },
      { customerSays: 'I need more plugs in my kitchen', techCalls: 'Additional circuits and receptacle installation — likely 20A dedicated circuit' },
      { customerSays: 'The lights dim when the AC kicks on', techCalls: 'Voltage sag from undersized service / low utility voltage / weak breaker' },
      { customerSays: 'Half my house lost power', techCalls: 'Open leg on split-phase service — utility issue or failed main breaker' },
      { customerSays: 'My hot tub / EV charger needs power', techCalls: '240V dedicated circuit installation with appropriate amperage breaker' },
      { customerSays: 'My fuse box is old and needs updating', techCalls: 'Electrical panel upgrade / service panel replacement' },
      { customerSays: 'The GFCI outlet won\'t reset', techCalls: 'Tripped or failed GFCI receptacle — may indicate wiring fault downstream' },
      { customerSays: 'I got a shock from my outlet', techCalls: 'Reverse polarity / open ground / wiring fault — safety inspection needed' },
      { customerSays: 'My bathroom outlet has no power', techCalls: 'Tripped GFCI upstream (often in another bathroom or garage)' },
      { customerSays: 'I need outdoor lights wired', techCalls: 'Exterior circuit installation — weatherproof fixtures, GFCI protection required' },
      { customerSays: 'I\'m adding a home addition — need wiring', techCalls: 'New construction rough-in / branch circuit extension' },
      { customerSays: 'My smoke detector keeps beeping', techCalls: 'End-of-life detector / low battery / wiring fault on hardwired unit' },
      { customerSays: 'Can you install a generator hookup?', techCalls: 'Transfer switch installation / interlock kit / generator inlet receptacle' },
      { customerSays: 'I need a permit for my renovation', techCalls: 'Electrical permit and inspection — required for most new circuit work' },
      { customerSays: 'The switch doesn\'t do anything', techCalls: 'Failed switch / broken wire connection / miswired 3-way configuration' }
    ],

    jobTypes: [
      { name: 'Electrical Panel Upgrade (100A to 200A)', priceLow: 1500, priceHigh: 5000, priceType: 'Flat Rate / Estimate', complexity: 'Complex', commonUpsell: 'Whole-home surge protector, smoke detector upgrade' },
      { name: 'Circuit Breaker Replacement', priceLow: 150, priceHigh: 400, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Panel inspection, arc-fault breaker upgrade' },
      { name: 'GFCI Outlet Installation / Replacement', priceLow: 100, priceHigh: 250, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Tamper-resistant outlets, additional GFCI protection' },
      { name: 'EV Charger Installation (Level 2)', priceLow: 400, priceHigh: 1200, priceType: 'Flat Rate / Estimate', complexity: 'Medium', commonUpsell: 'Panel upgrade if service is insufficient, outlet timer install' },
      { name: 'Ceiling Fan Installation', priceLow: 150, priceHigh: 350, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Smart switch/dimmer install, additional lighting circuit' },
      { name: 'Recessed Lighting Installation (per fixture)', priceLow: 200, priceHigh: 450, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Smart dimmer switches, additional circuits' },
      { name: 'Whole-Home Surge Protector Installation', priceLow: 250, priceHigh: 600, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Individual outlet surge protectors, panel inspection' },
      { name: 'Dedicated Circuit Addition', priceLow: 300, priceHigh: 800, priceType: 'Flat Rate / T&M', complexity: 'Medium', commonUpsell: 'Panel upgrade, outlet upgrade at appliance location' },
      { name: 'Outlet / Receptacle Replacement', priceLow: 75, priceHigh: 200, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'USB outlets, tamper-resistant upgrade, GFCI where needed' },
      { name: 'Smoke & CO Detector Installation (hardwired)', priceLow: 150, priceHigh: 400, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: '10-year sealed battery detectors, combo units' },
      { name: 'Sub-Panel Installation', priceLow: 1000, priceHigh: 3500, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Additional circuits from sub-panel, surge protection' },
      { name: 'Generator Transfer Switch / Interlock Installation', priceLow: 400, priceHigh: 1200, priceType: 'Flat Rate / Estimate', complexity: 'Medium', commonUpsell: 'Whole-home standby generator, panel upgrade' },
      { name: 'Landscape / Outdoor Lighting Circuit', priceLow: 500, priceHigh: 2000, priceType: 'T&M / Estimate', complexity: 'Medium', commonUpsell: 'Smart outdoor lighting controls, security cameras on circuit' },
      { name: 'Bathroom Exhaust Fan Installation / Replacement', priceLow: 200, priceHigh: 500, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Humidity-sensing fan upgrade, GFCI outlet install' },
      { name: 'Smart Home Device Wiring (switches, dimmers, thermostats)', priceLow: 150, priceHigh: 500, priceType: 'Flat Rate / T&M', complexity: 'Simple', commonUpsell: 'Whole-home smart panel, additional smart devices' },
      { name: 'Aluminum Wiring Remediation', priceLow: 1500, priceHigh: 8000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Full rewire, panel upgrade, whole-home inspection' },
      { name: 'Service Entrance / Weatherhead Repair or Replacement', priceLow: 500, priceHigh: 2000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Panel upgrade while utility is involved' },
      { name: 'Hot Tub / Pool Electrical Hookup', priceLow: 600, priceHigh: 2500, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Panel upgrade, GFCI breaker, bonding inspection' },
      { name: 'Electrical Inspection / Safety Audit', priceLow: 150, priceHigh: 400, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Remediation of any issues found, panel upgrade' },
      { name: 'Whole-Home Rewire', priceLow: 10000, priceHigh: 30000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Panel upgrade, smart home integration, surge protection' }
    ],

    seasonal: {
      peakMonths: 'March–May (spring renovation season). June–August (AC demand reveals overloaded panels). October–November (pre-holiday — customers want lighting, outlets, and safety checks before family visits).',
      slowMonths: 'January and February. Post-holiday budget hangover slows discretionary projects. Emergency calls still come in but booked project work drops off.',
      preSeasonOpportunity: 'February–March: Panel inspections and safety audits before summer AC demand. Great time to push EV charger installs and whole-home surge protection before storm season.',
      postSeasonOpportunity: 'September–October: Follow up on customers who had summer issues but did not commit to panel upgrades. Strong window for generator hookup installs before winter storms.',
      rebookingWindow: 'Whole-Home Electrical Safety Inspection annually for homes over 20 years old. Major projects like panel upgrades or rewires are once per home every 10–20 years. EV charger installs are a strong one-time upsell with no seasonal pattern.',
      campaigns: [
        { period: 'February', name: 'Pre-Spring Renovation Push', hook: 'Planning a renovation this spring? Book your electrical work now before our schedule fills up. Panel upgrades, new circuits, and lighting — let\'s plan it together.' },
        { period: 'May', name: 'EV Season Kickoff', hook: 'EV sales peak in spring. We install Level 2 home chargers in under a day. Beat the summer rush and get yours booked now.' },
        { period: 'June', name: 'Summer Safety Check', hook: 'Air conditioning season is hard on electrical panels. If your breakers are older than 20 years, they may not handle the load. Book a free panel assessment this month.' },
        { period: 'September', name: 'Storm Season Prep', hook: 'Generator hookups and whole-home surge protection are in high demand before storm season. Limited slots — book now to make sure you are covered.' },
        { period: 'October', name: 'Pre-Holiday Home Prep', hook: 'Having family over for the holidays? Adding outlets, upgrading lighting, or finally sorting that outdoor power situation — let us get it done before the house fills up.' },
        { period: 'December', name: 'New Year Upgrade Offer', hook: 'Start the new year with a safer, smarter home. Book a January panel inspection or electrical upgrade and get a $50 service credit. Limited slots available.' }
      ]
    },

    intake: {
      firstQuestions: [
        'What\'s going on — is it a safety issue like sparks or a burning smell, or is the power out somewhere in the house?',
        'Is this something that just started, or has it been a problem for a while?',
        'Is your home older than 25 years, and do you know if you have a standard breaker panel or an older fuse box?'
      ],
      emergencyTriggers: [
        'Burning smell coming from an outlet, switch, or panel',
        'Visible sparks or arcing from any electrical component',
        'Power out to the entire home — especially with young children, medical equipment, or in extreme weather',
        'Outlet or switch is warm or hot to the touch',
        'Customer received an electrical shock from any device or surface',
        'Water has contacted electrical components — flooding or roof leak near panel',
        'Smoke detector going off with no obvious fire source — possible electrical fire in walls',
        'Breaker will not reset after tripping and power is out to critical areas (fridge, medical devices, heating/cooling)'
      ],
      commonMisunderstandings: [
        { customerSays: 'My breaker is broken, it needs replacing', tabbyCorrects: 'A tripped breaker is not necessarily a broken one. Ask if they have tried resetting it first — push it fully off then back on.' },
        { customerSays: 'It\'s a panel problem', tabbyCorrects: 'GFCI issues are often a tripped outlet in another room, not a panel fault. Walk them through checking other GFCI outlets first.' },
        { customerSays: 'Can you come tomorrow?', tabbyCorrects: 'Permit-required jobs (panel upgrades, new circuits) take 2–3 weeks with inspection scheduling. Set expectations at booking.' },
        { customerSays: 'The power company needs to fix this', tabbyCorrects: 'The utility owns everything up to and including the meter. Inside the home is the homeowner\'s responsibility. Clarify the boundary clearly.' }
      ]
    },

    dispatch: {
      vanStockHighlights: [
        'Assorted circuit breakers (Square D, Eaton, Siemens) — 15A, 20A, 30A, 50A, 60A, GFCI and AFCI',
        'GFCI receptacles 15A and 20A (6 of each)',
        'Standard duplex receptacles 15A and 20A (10 of each)',
        'Single-pole and 3-way switches (6 of each)',
        'Wire — 12/2, 14/2, 12/3, 14/3 NM-B Romex (50ft rolls)',
        'Wire — 10/2 and 8/3 NM-B for appliance circuits (25ft rolls)',
        'Fish tape (25ft and 50ft)',
        'Voltage tester (non-contact) and multimeter (2 of each)',
        'Circuit tracer / tone generator kit',
        'Tamper-resistant receptacles 15A and 20A (6 of each)',
        'Smoke and CO combo detectors hardwired (3 units)',
        'Rubber insulating gloves Class 00, safety glasses, knee pads'
      ],
      redFlagsForSeniorTech: [
        'Customer reports sparks, burning smell, or scorch marks around any electrical component',
        'Home built before 1975 — potential knob-and-tube, cloth-wrapped wiring, or aluminum branch wiring',
        'Panel is a recalled brand: Federal Pacific (Stab-Lok), Zinsco, or Pushmatic',
        'Any job involving the utility service entrance, weatherhead, or meter base',
        'Hot tub, pool, or sauna electrical hookup — bonding and GFCI compliance is safety-critical',
        'Commercial property or any 3-phase electrical work',
        'Recurring breaker trips on the same circuit despite no appliance changes',
        'Whole-home rewire or any job involving asbestos-wrapped wiring',
        'Any job where a permit has been pulled and inspection is pending',
        'Customer had a previous fire or water intrusion affecting the electrical system'
      ],
      permitRequiredJobs: [
        'Panel upgrades',
        'New circuit additions',
        'Sub-panel installs',
        'Service entrance work',
        'EV charger installs',
        'Hot tub / pool wiring',
        'Generator transfer switch installs',
        'Whole-home rewires',
        'Aluminum wiring remediation'
      ]
    },

    marketing: {
      winBackAngles: [
        { name: 'Annual Safety Check Reminder', timing: '12 months since last visit', message: 'It has been 12 months since we last worked on your home. A quick panel health check could catch issues before they become emergencies.' },
        { name: 'EV Charger Upsell', timing: 'Spring / any time', message: 'Did you recently buy or consider an electric vehicle? We can get a Level 2 charger installed so you wake up every morning with a full charge.' },
        { name: 'Pre-Summer AC Readiness', timing: 'May–June', message: 'When your AC kicks on this summer, your panel needs to handle it. We see a spike in breaker failures every June — let\'s get you checked before the heat hits.' },
        { name: 'Surge Protection Follow-Up', timing: 'Post-storm season', message: 'After the last storm season, we installed surge protectors for many of your neighbours. One power spike can take out TVs, appliances, and computers.' },
        { name: 'Pre-Sale Inspection Offer', timing: 'Any time', message: 'Thinking about selling in the next year or two? Buyers\' inspectors flag electrical issues every time. We can find and fix them first so you control the process.' }
      ],
      upsellMoments: [
        { moment: 'After panel upgrade', pitch: 'Panel is already open — add a whole-home surge protector for $250–$400. Protects every appliance in the home. Easy yes.' },
        { moment: 'After any new circuit', pitch: 'Customer is already thinking about power. Ask if they plan to go electric. Opens an EV charger install conversation worth $500–$1,200.' },
        { moment: 'After safety inspection', pitch: 'If the home has old battery-only smoke detectors, upsell hardwired interconnected units. Simple job customers feel good about.' }
      ],
      reviewTiming: 'Within 2–4 hours of job completion while the tech is still fresh in their mind. Send SMS with a direct Google Review link. If the customer expressed satisfaction verbally to the tech, that is the trigger.',
      referralHook: '$50 referral credit for any job over $300. Frame it as sharing a good experience, not just earning a reward. Electrical customers refer when they feel they got a fair price and a tech who explained things clearly.'
    },

    financial: {
      callOutFee: { low: 75, high: 250, note: 'Credited against the job if customer proceeds. Premium metros (NYC, SF, LA) charge $200+ flat diagnostic fees typically not credited.' },
      afterHoursPremium: '1.5x standard rate is most common. Some businesses add a flat after-hours fee of $100–$200 on top of standard rates.',
      materialMarkup: '20–40% markup on parts is standard. Never mark up below 20%.',
      paymentTerms: 'Residential: due on completion. Commercial: Net 30 standard, larger contracts Net 45–60.',
      depositPolicy: 'Any job over $1,500 — 30–50% deposit before materials are ordered. Panel upgrades, full rewires, and large installs always require a deposit.',
      invoiceTiers: [
        { size: 'Small', rangeLow: 100, rangeHigh: 400, examples: 'Single outlet, switch, or breaker replacement' },
        { size: 'Medium', rangeLow: 400, rangeHigh: 1200, examples: 'Circuit addition, EV charger, fan install' },
        { size: 'Large', rangeLow: 1200, rangeHigh: 5000, examples: 'Panel upgrade, sub-panel, generator hookup' },
        { size: 'Premium', rangeLow: 5000, rangeHigh: 25000, examples: 'Full rewire, commercial work, aluminum wiring remediation' }
      ],
      changeOrderTriggers: [
        'Panel is full — adding breakers requires tandem breakers or a new sub-panel',
        'Aluminum wiring discovered during a standard outlet replacement — changes materials, method, and time',
        'Walls or ceiling need to be opened to run wire — customer thought it was a surface-mount job',
        'Existing unlicensed or unsafe work must be corrected before new work can be connected',
        'Permit required that was not originally discussed — adds cost and timeline',
        'Utility involvement needed (service upgrade, new meter base) — completely outside original scope'
      ]
    }
  }

  ,

  /* ──────────────────────────────────────────────
     PLUMBING
  ────────────────────────────────────────────── */
  plumbing: {
    meta: {
      id: 'plumbing',
      name: 'Plumbing',
      fullName: 'Plumbing — United States',
      shortDescription: 'Plumbers install, repair, and maintain all the pipes, fixtures, and systems that carry water, gas, and waste in homes and commercial buildings — from fixing a dripping tap to replacing an entire sewer line.',
      customerPainPoint: 'Customers call in a state of stress. Something is leaking, blocked, or broken and they can\'t use their sink, toilet, or shower. They\'re embarrassed, worried about damage to their home, and anxious about being charged a fortune without knowing what\'s fair.',
      jobCompletionFeeling: 'Relief. Clean, working water with no mess left behind feels like a crisis resolved. When it goes well, customers feel looked after and safe — and they tell people about it.'
    },

    consumerLanguage: [
      { customerSays: 'My toilet keeps running / won\'t stop filling', techCalls: 'Faulty fill valve, worn flapper, or float set too high' },
      { customerSays: 'Water is leaking under my sink', techCalls: 'Failed supply line, loose drain P-trap connection, or cracked drain basket' },
      { customerSays: 'My drain is slow / the sink won\'t empty', techCalls: 'Partial blockage — hair, grease, or soap build-up in trap or drain line' },
      { customerSays: 'The toilet is clogged and won\'t flush', techCalls: 'Blockage in the trapway or drain line — auger or snake required' },
      { customerSays: 'I have no hot water', techCalls: 'Failed water heater — element, thermostat, pilot light (gas), or full unit failure' },
      { customerSays: 'Water under the floor / wet carpet near bathroom', techCalls: 'Slab leak, sub-floor supply line failure, or toilet wax ring failure' },
      { customerSays: 'Water pressure is really low', techCalls: 'Failing PRV (pressure reducing valve), mineral build-up in aerators/showerheads, or main shut-off partially closed' },
      { customerSays: 'My water looks brown or smells funny', techCalls: 'Corroded pipes, failing anode rod in water heater, or sediment build-up in tank' },
      { customerSays: 'There\'s a banging noise in the pipes', techCalls: 'Water hammer — pressure surges causing pipes to knock; can mean loose pipe straps or missing air chambers' },
      { customerSays: 'My garbage disposal is humming but not spinning', techCalls: 'Jammed impeller plate — reset button needed or manual unjam with hex wrench' },
      { customerSays: 'Something smells like sewage in the house', techCalls: 'Dried P-trap, cracked vent stack, or sewer gas leaking through a failed wax ring or drain seal' },
      { customerSays: 'My water heater is leaking from the bottom', techCalls: 'Corroded tank floor — usually means full water heater replacement needed' },
      { customerSays: 'Water is dripping from the ceiling', techCalls: 'Active leak from the floor above — could be supply line, toilet, or drain — needs immediate inspection' },
      { customerSays: 'I have no water at all', techCalls: 'Main shut-off closed accidentally, city supply issue, or burst main supply line' },
      { customerSays: 'My outside tap won\'t stop dripping', techCalls: 'Worn hose bib washer or faulty frost-free bib stem — simple repair or full replacement' },
      { customerSays: 'The washing machine connection is leaking', techCalls: 'Loose or cracked supply hose, worn hose fitting washer, or failed valve behind unit' },
      { customerSays: 'The water bill went way up for no reason', techCalls: 'Silent toilet leak (flapper), underground supply line leak, or irrigation system failure' }
    ],

    jobTypes: [
      { name: 'Faucet Repair / Replacement', priceLow: 150, priceHigh: 450, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Aerator and supply line upgrade' },
      { name: 'Toilet Repair (flapper / fill valve / handle)', priceLow: 100, priceHigh: 280, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Dual-flush valve upgrade' },
      { name: 'Toilet Replacement (full swap)', priceLow: 350, priceHigh: 900, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Comfort-height or bidet seat' },
      { name: 'Drain Cleaning (single drain, snake)', priceLow: 150, priceHigh: 350, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Drain strainer, enzyme treatment plan' },
      { name: 'Hydro-Jetting (mainline)', priceLow: 350, priceHigh: 900, priceType: 'T&M / Flat Rate', complexity: 'Medium', commonUpsell: 'Annual maintenance plan' },
      { name: 'Water Heater Replacement (tank, 40–50 gal)', priceLow: 1000, priceHigh: 2500, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Expansion tank, flush and drain service' },
      { name: 'Tankless Water Heater Install', priceLow: 1500, priceHigh: 4500, priceType: 'T&M', complexity: 'Complex', commonUpsell: 'Annual descaling plan' },
      { name: 'Sewer Line Camera Inspection', priceLow: 175, priceHigh: 450, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Full cleanout or spot repair quote' },
      { name: 'Sewer Line Repair / Spot Repair', priceLow: 1500, priceHigh: 5000, priceType: 'T&M / Estimate', complexity: 'Complex', commonUpsell: 'Trenchless relining, maintenance plan' },
      { name: 'Water Softener Install', priceLow: 900, priceHigh: 2500, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Annual salt delivery plan' },
      { name: 'Garbage Disposal Replacement', priceLow: 200, priceHigh: 450, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Dishwasher inspection, drain line clean' },
      { name: 'Pipe Repair / Leak Fix (accessible)', priceLow: 200, priceHigh: 650, priceType: 'Flat Rate / T&M', complexity: 'Simple', commonUpsell: 'Pressure test rest of line' },
      { name: 'Whole-House Repiping (copper or PEX)', priceLow: 4500, priceHigh: 15000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Water filtration, pressure regulator' },
      { name: 'Pressure Regulator Valve (PRV) Replacement', priceLow: 250, priceHigh: 650, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Whole-house pressure test, expansion tank' },
      { name: 'Outdoor Hose Bib Replace / Add', priceLow: 150, priceHigh: 400, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Frost-free bib upgrade, shut-off valve' },
      { name: 'Gas Line Repair / Extension', priceLow: 300, priceHigh: 1800, priceType: 'T&M / Permit', complexity: 'Complex', commonUpsell: 'Whole-line pressure test, CSST bonding check' },
      { name: 'Bathroom or Kitchen Rough-In (new construction / reno)', priceLow: 1200, priceHigh: 6000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Fixture package, ongoing project relationship' },
      { name: 'Leak Detection (non-visible leak)', priceLow: 200, priceHigh: 550, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Thermal imaging scan, pipe repair' },
      { name: 'Sump Pump Install / Replace', priceLow: 500, priceHigh: 1500, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Battery backup pump, annual check plan' },
      { name: 'Backflow Preventer Test / Replace', priceLow: 100, priceHigh: 600, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Annual test contract' }
    ],

    seasonal: {
      peakMonths: 'January–February (pipe bursts from freezing in cold-weather states). June–August (summer remodels, water heater failures from high usage). October–November (pre-winter winterisation and water heater prep). In Sun Belt states (FL, TX, AZ), demand is more even year-round.',
      slowMonths: 'March–April and September–October in northern states — the shoulder seasons between winter freeze risk and summer activity.',
      preSeasonOpportunity: 'October: "Winter-ready" campaigns targeting pipe insulation, outdoor tap winterisation, and water heater inspections before temperatures drop. Urgency angle: "Before the first freeze."',
      postSeasonOpportunity: 'March/April: After winter, customers often have small leaks, pressure issues, or frost damage they have been ignoring. Win-back angle: "You may not know it yet, but winter is hard on pipes — let\'s check."',
      rebookingWindow: 'Annual maintenance plans (water heater flush, drain treatment, PRV check) keep customers on a 12-month cycle. "Plumbing Health Check" at $99–$199 flat rate is the best recurring revenue tool in this trade.',
      campaigns: [
        { period: 'October / November', name: 'Freeze-Proof Your Home', hook: 'Outdoor tap winterisation, pipe insulation check, water heater inspection. Cold-weather states only. One freeze can crack pipes and cost thousands.' },
        { period: 'January / February', name: 'Emergency Pipe Burst Recovery', hook: 'Post-freeze repair offers. Emergency response positioning. Show fast response times for burst pipe repairs.' },
        { period: 'March / April', name: 'Spring Plumbing Refresh', hook: 'Post-winter damage check, drain clean, general health check offer. Reactivation angle for past customers who had winter work done.' },
        { period: 'June / July', name: 'Beat the Summer Rush', hook: 'Water heater tune-up, water softener service, outdoor irrigation plumbing check. Book now before peak season wait times.' },
        { period: 'August / September', name: 'Back to School, Back to Routine', hook: 'Annual plumbing health check offer. Maintenance plan sign-up campaign. Families back on routine equals predictable schedules.' },
        { period: 'Any month', name: 'Post-Job Review Ask', hook: 'Personal follow-up message 2–4 hours after job completed. Short, warm, direct link to Google Review.' }
      ]
    },

    intake: {
      firstQuestions: [
        'Is there active water flowing or leaking right now that you can\'t stop?',
        'Which fixture or area of the home is affected — toilet, sink, water heater, or somewhere else?',
        'How long has this been happening, and have you already turned off any water supply?'
      ],
      emergencyTriggers: [
        'Active water leak that can\'t be isolated — water flowing freely in the home',
        'No water to entire house — full supply failure',
        'Sewage backing up into toilets, tubs, or floor drains',
        'Gas smell near plumbing or water heater — treat as gas emergency first (call 911 / gas company before dispatch)',
        'Water heater leaking from the tank base — risk of flooding',
        'Visible water staining spreading on ceiling or wall — active leak above',
        'Toilet overflow with young children, elderly, or immunocompromised person in home',
        'Burst or frozen pipe in cold weather with water running'
      ],
      commonMisunderstandings: [
        { customerSays: 'It\'s just a quick fix — should only take 5 minutes', tabbyCorrects: 'Even simple jobs require diagnostics, parts, and proper testing. Set realistic expectations upfront.' },
        { customerSays: 'Can you give me a price right now over the phone?', tabbyCorrects: 'Pricing is provided after the tech assesses the job on-site, but offer a ballpark range so the customer is not surprised.' },
        { customerSays: 'I just need someone to turn up and tighten something', tabbyCorrects: 'Often what seems simple turns out to be a bigger issue. The tech will check everything properly before quoting.' },
        { customerSays: 'I can just wait until Monday', tabbyCorrects: 'If there is an active leak, waiting risks water damage that could cost far more than the repair. Gently flag the risk.' }
      ]
    },

    dispatch: {
      vanStockHighlights: [
        'Pipe wrench set (10", 14", 18")',
        'Hand snake / drum auger (25ft) for drain clearing',
        'PEX pipe (1/2" and 3/4") — 10ft each',
        'Copper pipe (1/2" and 3/4") — 10ft each',
        'Push-fit fittings (SharkBite style) — assorted elbows, couplings, tees',
        'Ball valves (1/2" and 3/4") — 2 of each',
        'Toilet repair kit (flapper, fill valve, flush valve) — 2 universal kits',
        'Faucet cartridge assortment (common Moen, Delta, Kohler)',
        'Wax ring set (standard and extra-thick) — 2 of each',
        'Water heater elements (240V, common wattages) — 2 elements and anode rod',
        'Garbage disposal (1/2 HP backup unit) for same-day swap',
        'Pressure gauge (0–200 PSI), shop vacuum (wet/dry 5 gal), pipe repair clamps'
      ],
      redFlagsForSeniorTech: [
        'Any work involving gas lines — CSST, black iron, or flexible connectors near appliances',
        'Slab leak suspected — requires leak detection equipment and careful access planning',
        'Whole-house repiping — multi-day job requiring coordination, permits, and wall access',
        'Active sewage backup with unknown cause — could be mainline collapse, root intrusion, or municipal issue',
        'Water heater showing signs of catastrophic failure (rust, base leak, age 12+ years) in a tight mechanical room',
        'Any job in a commercial building or multi-unit property',
        'Customer mentions galvanised or lead pipes — health and structural risk',
        'Any leak that has been active more than 24 hours with potential structural damage to floors or framing',
        'Pressure loss across whole house with no obvious cause — could be hidden main line failure',
        'Permit work in a jurisdiction the tech has not worked in before'
      ],
      permitRequiredJobs: [
        'Water heater replacement (most jurisdictions)',
        'Sewer line repair / replacement',
        'Whole-house repiping',
        'Gas line work',
        'New bathroom or kitchen rough-in',
        'Adding fixtures or extending supply lines',
        'Sump pump installation'
      ]
    },

    marketing: {
      winBackAngles: [
        { name: 'Winter-Ready Check', timing: 'September–October (cold-weather states)', message: 'We fixed your drain/tap/heater X months ago — before winter hits, let us make sure everything else is tight.' },
        { name: 'Water Heater Age Reminder', timing: 'When unit was 7+ years old at last service', message: 'The average water heater lasts 8–12 years. Yours may be getting close — want us to check it before it fails?' },
        { name: 'Annual Drain Maintenance', timing: '10–14 months after drain work', message: 'Hair, grease, and soap build-up does not disappear on its own. A quick annual clean now saves a weekend emergency later.' },
        { name: 'Post-Summer Catch-Up', timing: 'August–September', message: 'Summer is tough on plumbing — more people home, more usage, more wear. A quick health check now catches small issues before they become big ones.' },
        { name: 'Upgrade Nudge (Old Fixtures)', timing: 'Any time — fixtures 10+ years old', message: 'If your fixtures are more than 10 years old, you\'re probably wasting water and money. Modern low-flow options pay for themselves fast.' }
      ],
      upsellMoments: [
        { moment: 'After drain cleaning', pitch: 'Offer a drain maintenance enzyme treatment plan ($10–$20/month) and a drain strainer for every sink and shower. Low cost, high perceived value.' },
        { moment: 'After water heater service', pitch: 'Offer an expansion tank ($150–$350 installed), anode rod check/replacement, and an annual flush maintenance plan — all legitimate safety and longevity add-ons.' },
        { moment: 'After any leak or pipe repair', pitch: 'Offer a whole-home pressure test ($99–$150). Frame it as: "We fixed the one you knew about — let\'s make sure there isn\'t another one waiting."' }
      ],
      reviewTiming: '2–4 hours after job completion — when the relief is still fresh. Marco sends a short personal text: "Hey [name], [tech name] mentioned the job went well today. Would you mind leaving us a quick review? It means a lot to a small business — [link]."',
      referralHook: '$25 off next call for any referred friend who books. Mention it at the end of the job and again in the follow-up message. "If you know anyone who needs a good plumber, send them our way — we\'ll take $25 off your next call."'
    },

    financial: {
      callOutFee: { low: 75, high: 250, note: 'Credited against the job if work is approved same visit. Major metros charge at the higher end.' },
      afterHoursPremium: '1.5x–2x standard rate. Flat after-hours surcharge of $50–$150 increasingly common in metro markets. Weekends and holidays attract the higher end.',
      materialMarkup: '30–50% on materials is standard in the US plumbing trade. Some businesses use cost-plus at 20–30% for larger jobs to stay competitive.',
      paymentTerms: 'Residential: payment on completion (same day). Commercial: Net 15–30.',
      depositPolicy: 'Any job over $1,000 — 30–50% deposit upfront. Full repiping or new construction rough-ins — 50% at start and 50% on completion. Always collect before ordering special-order materials.',
      invoiceTiers: [
        { size: 'Small', rangeLow: 100, rangeHigh: 450, examples: 'Faucet repair, toilet flapper, drain snake, disposal unjam' },
        { size: 'Medium', rangeLow: 450, rangeHigh: 1500, examples: 'Toilet replacement, water heater service, PRV swap, leak fix with parts' },
        { size: 'Large', rangeLow: 1500, rangeHigh: 6000, examples: 'Water heater replacement, sewer spot repair, bathroom rough-in' },
        { size: 'Premium', rangeLow: 6000, rangeHigh: 20000, examples: 'Full repiping, sewer line replacement, tankless install with gas line work, commercial job' }
      ],
      changeOrderTriggers: [
        'Unexpected pipe condition found — corrosion, damage, or non-standard materials that change the repair approach',
        'Access is harder than expected — tile, concrete, or structural elements need to be cut or removed',
        'Additional fixtures found to be faulty while tech is on-site',
        'Materials substitution needed — specified part unavailable, more expensive part required',
        'Permit required mid-job that was not originally discussed',
        'Camera inspection reveals larger scope than the repair originally quoted — e.g., full sewer replacement instead of spot fix'
      ]
    }
  }

  ,

  /* ──────────────────────────────────────────────
     AUTO SERVICES
  ────────────────────────────────────────────── */
  'auto-services': {
    meta: {
      id: 'auto-services',
      name: 'Auto Services',
      fullName: 'Auto Services — United States',
      shortDescription: 'Auto service shops diagnose, repair, and maintain cars, trucks, and SUVs. That covers everything from oil changes and tire swaps to complex engine and transmission work.',
      customerPainPoint: 'Customers feel anxious and stuck — often stranded, late for work, and worried about a bill they can\'t predict. The car is their lifeline, and when it fails, their whole day or week falls apart.',
      jobCompletionFeeling: 'Relief and trust. When the job is done right, they feel safe again and back in control. A good experience turns a one-time customer into a loyal regular.'
    },

    consumerLanguage: [
      { customerSays: 'My check engine light is on', techCalls: 'Diagnostic Trouble Code (DTC) scan — could be O2 sensor, catalytic converter, MAF sensor, loose gas cap, or dozens of other triggers' },
      { customerSays: 'My car won\'t start', techCalls: 'No-start diagnosis — dead battery, failed starter motor, bad alternator, fuel pump failure, or ignition system fault' },
      { customerSays: 'My brakes are squealing / grinding', techCalls: 'Brake inspection — worn brake pads, glazed rotors, or metal-on-metal contact requiring pad and rotor replacement' },
      { customerSays: 'My car is shaking when I drive', techCalls: 'Vibration diagnosis — unbalanced or damaged tires, bent wheel, worn CV axle, brake rotor runout, or driveshaft issue' },
      { customerSays: 'My car pulls to one side', techCalls: 'Wheel alignment issue — toe, camber, or caster out of spec; could also be uneven tire pressure or worn suspension components' },
      { customerSays: 'There\'s a knocking sound from the engine', techCalls: 'Engine knock diagnosis — low oil pressure, worn rod bearings, piston slap, or carbon buildup (detonation)' },
      { customerSays: 'My air conditioning blows warm air', techCalls: 'A/C system diagnosis — low refrigerant charge, failed compressor, clogged condenser, or faulty expansion valve' },
      { customerSays: 'My car is leaking something', techCalls: 'Fluid leak diagnosis — could be engine oil, coolant, transmission fluid, power steering fluid, brake fluid, or differential fluid' },
      { customerSays: 'My car is overheating', techCalls: 'Cooling system failure — low coolant, faulty thermostat, failed water pump, clogged radiator, or blown head gasket' },
      { customerSays: 'My tires look low / flat', techCalls: 'Tire service — flat repair (plug/patch), tire inflation, or tire replacement if sidewall damage or beyond repair' },
      { customerSays: 'My car smells like something burning', techCalls: 'Burning smell diagnosis — oil on exhaust, slipping belt, burning brake material, electrical fault, or coolant leak onto hot engine parts' },
      { customerSays: 'My transmission slips / won\'t shift right', techCalls: 'Transmission diagnosis — low fluid, dirty fluid, worn clutch packs, faulty solenoid, or full transmission failure' },
      { customerSays: 'My battery keeps dying', techCalls: 'Charging system test — weak battery (failed CCA), failing alternator, parasitic drain, or corroded terminals' },
      { customerSays: 'My steering feels loose / wobbly', techCalls: 'Steering and suspension inspection — worn tie rods, ball joints, struts, or power steering rack issue' },
      { customerSays: 'My car makes a clicking noise when I turn', techCalls: 'CV axle / CV joint failure — clicking on turns is a classic worn constant velocity joint indicator needing axle replacement' },
      { customerSays: 'My car hesitates when I accelerate', techCalls: 'Engine performance diagnosis — dirty fuel injectors, failing spark plugs, clogged air filter, failing throttle body, or fuel pressure issue' },
      { customerSays: 'My car fails emissions', techCalls: 'Emissions repair — triggered DTC codes, failing catalytic converter, evap system leak, or O2 sensor replacement needed' },
      { customerSays: 'My car won\'t pass inspection', techCalls: 'Pre-inspection service / safety repair — brakes, tires, lights, wipers, or emissions items below state standards' },
      { customerSays: 'My windshield wipers don\'t work properly', techCalls: 'Wiper system service — worn wiper blades, low washer fluid, faulty wiper motor, or clogged washer nozzles' }
    ],

    jobTypes: [
      { name: 'Oil Change (Conventional)', priceLow: 50, priceHigh: 120, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Cabin air filter, engine air filter, wiper blades, tire rotation' },
      { name: 'Oil Change (Synthetic / Full Synthetic)', priceLow: 80, priceHigh: 200, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Fuel system cleaner, multi-point inspection, tire rotation' },
      { name: 'Brake Pad & Rotor Replacement (per axle)', priceLow: 300, priceHigh: 800, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Brake fluid flush, caliper slide pin service, brake caliper replacement' },
      { name: 'Battery Replacement', priceLow: 175, priceHigh: 380, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Charging system test, terminal cleaning/replacement, alternator check' },
      { name: 'Tire Rotation & Balance', priceLow: 65, priceHigh: 130, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Alignment check, tire tread depth inspection, TPMS service' },
      { name: 'Wheel Alignment (4-Wheel)', priceLow: 110, priceHigh: 230, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Suspension inspection, tie rod replacement, new tires if worn unevenly' },
      { name: 'Diagnostic Scan (Check Engine / Warning Light)', priceLow: 100, priceHigh: 180, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Sensor replacement, catalytic converter, emissions repair, full vehicle scan' },
      { name: 'AC Recharge & Service', priceLow: 160, priceHigh: 380, priceType: 'Flat Rate / T&M', complexity: 'Medium', commonUpsell: 'Cabin air filter, full A/C system inspection, condenser cleaning' },
      { name: 'Coolant Flush & Thermostat Replacement', priceLow: 130, priceHigh: 300, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Radiator cap, hose inspection, water pump inspection' },
      { name: 'Spark Plug Replacement', priceLow: 160, priceHigh: 450, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Ignition coil inspection, fuel injector cleaning, air filter replacement' },
      { name: 'Alternator Replacement', priceLow: 450, priceHigh: 950, priceType: 'Flat Rate / T&M', complexity: 'Medium', commonUpsell: 'New battery, serpentine belt replacement, charging system test' },
      { name: 'Starter Motor Replacement', priceLow: 320, priceHigh: 750, priceType: 'Flat Rate / T&M', complexity: 'Medium', commonUpsell: 'Battery replacement, alternator test, ignition switch inspection' },
      { name: 'Transmission Service (Fluid & Filter)', priceLow: 200, priceHigh: 420, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Full transmission inspection, throttle body service, torque converter inspection' },
      { name: 'CV Axle / Half-Shaft Replacement', priceLow: 380, priceHigh: 800, priceType: 'Flat Rate / T&M', complexity: 'Medium', commonUpsell: 'Other axle inspection, transmission fluid top-up, wheel bearing check' },
      { name: 'Strut / Shock Absorber Replacement (per axle)', priceLow: 450, priceHigh: 950, priceType: 'Flat Rate / T&M', complexity: 'Medium', commonUpsell: 'Wheel alignment after replacement, tire inspection, lower control arm bushings' },
      { name: 'Fuel Injector Cleaning / Replacement', priceLow: 160, priceHigh: 650, priceType: 'Flat Rate / T&M', complexity: 'Medium', commonUpsell: 'Fuel filter replacement, throttle body cleaning, fuel pressure test' },
      { name: 'Timing Belt / Timing Chain Replacement', priceLow: 700, priceHigh: 1800, priceType: 'Flat Rate / T&M', complexity: 'Complex', commonUpsell: 'Water pump replacement, coolant flush, serpentine belt' },
      { name: 'Head Gasket Replacement', priceLow: 1600, priceHigh: 3800, priceType: 'T&M / Estimate', complexity: 'Complex', commonUpsell: 'Full cooling system service, timing components, oil flush, spark plugs' },
      { name: 'Catalytic Converter Replacement', priceLow: 450, priceHigh: 2800, priceType: 'Flat Rate / T&M', complexity: 'Complex', commonUpsell: 'O2 sensors, spark plugs, air/fuel diagnosis to fix root cause of cat failure' },
      { name: 'Pre-Purchase Vehicle Inspection', priceLow: 110, priceHigh: 270, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Any faults found quoted on the spot, fluid services, tire replacement' }
    ],

    seasonal: {
      peakMonths: 'March–May (spring — post-winter repair needs, pothole damage, tire swaps, pre-road-trip services). September–November (fall — pre-winter prep, tire swaps, battery replacements before the cold).',
      slowMonths: 'January–February (post-holiday spending fatigue). Mid-July through August in many markets as people defer non-urgent work during vacation season.',
      preSeasonOpportunity: 'February/March: Winter damage check — alignment, tire inspection, battery test, brake inspection. Market it as a "Winter Recovery Check" before spring road trips.',
      postSeasonOpportunity: 'After peak spring season, many customers deferred smaller items. June is a good win-back window for follow-up oil changes, air filter replacements, and mid-year tire rotations.',
      rebookingWindow: 'Every 3–6 months for maintenance (oil change, rotation). Once per year for inspections. Every 2–4 years for bigger items like brakes and tires. Battery and major repairs every 3–7 years.',
      campaigns: [
        { period: 'February / March', name: 'Spring Road Trip Prep', hook: 'Your car survived winter. Let\'s make sure it\'s ready for the road ahead. Oil change, tire swap, alignment, and battery test bundles.' },
        { period: 'May / June', name: 'Summer Travel Check', hook: 'Summer driving is tough on vehicles. Target families planning vacations — AC service, coolant check, tire inspection, and fluid top-ups.' },
        { period: 'August', name: 'Back to School Check', hook: 'Don\'t let car trouble derail the new school year. Multi-point inspections and deferred maintenance catch-up.' },
        { period: 'October / November', name: 'Winter Prep Bundle', hook: 'Don\'t get caught in the cold. Battery replacement, winter tire swap, coolant flush, wiper blades. Urgency-based messaging works well here.' },
        { period: 'January', name: 'New Year, Reliable Car', hook: 'Start the year right. Low-pressure maintenance messaging for customers who ignored the car over the holidays. Oil change + check-up angle.' },
        { period: 'Year-round', name: 'Vehicle Birthday Campaign', hook: 'Your [Year] [Make Model] turns X this year. Time for a health check. Personalised, non-pushy, and creates a memorable reason to reach out.' }
      ]
    },

    intake: {
      firstQuestions: [
        'What\'s happening with your vehicle — is it driveable right now, or is it stuck somewhere?',
        'What year, make, and model is the vehicle, and roughly how many miles does it have?',
        'How long has this been happening, and have you noticed any warning lights, sounds, or smells?'
      ],
      emergencyTriggers: [
        'Vehicle is completely undriveable or stranded on the road — needs tow dispatch',
        'Brakes feel soft, spongy, or pedal goes to the floor — safety risk, immediate',
        'Smoke or steam coming from engine — possible overheating or fire risk',
        'Strong smell of burning inside the cabin or from under the hood',
        'No brakes at all or grinding that started suddenly — do not drive',
        'Vehicle overheating warning light on and temperature gauge in the red',
        'Fuel leak smell especially near exhaust — fire hazard, park and stop driving',
        'Loud knocking or banging noises on startup'
      ],
      commonMisunderstandings: [
        { customerSays: 'Can you just reset my check engine light?', tabbyCorrects: 'Resetting without diagnosing means it comes straight back. The diagnostic scan is the necessary first step, not optional.' },
        { customerSays: 'My warranty should cover this', tabbyCorrects: 'Extended warranties and manufacturer warranties have different terms. Cannot confirm coverage without checking with the service advisor first.' },
        { customerSays: 'It\'ll only take 20 minutes, right?', tabbyCorrects: 'A check engine light alone can take 1–2 hours to properly trace. Customers often underestimate diagnosis time.' },
        { customerSays: 'I already Googled it and it\'s just the [part]', tabbyCorrects: 'Customer self-diagnosis is often partially right. Validate their concern but don\'t quote based on it before a proper inspection.' },
        { customerSays: 'I just need a wheel alignment', tabbyCorrects: 'If they\'ve hit a pothole or the car is pulling, alignment won\'t fix worn suspension parts underneath it. Inspection first.' }
      ]
    },

    dispatch: {
      vanStockHighlights: [
        'Professional OBD-II scan tool (e.g. Autel MaxiSys or Launch X431)',
        'Digital battery tester / smart charger with jump-start mode',
        'Auto-ranging multimeter, test light, relay/fuse test kit',
        'Engine oil — 2L each of 0W-20, 5W-20, 5W-30, 10W-30',
        'Coolant (pre-mixed 1 gallon universal or OAT)',
        'Brake fluid DOT 3 and DOT 4 (16oz bottles each)',
        'Transmission fluid — Dexron VI and Toyota WS (1qt each)',
        'Torque wrench 1/2" drive calibrated to 150 ft/lbs',
        'Impact wrench cordless 18–20V minimum 400 ft/lbs',
        'Socket set metric and SAE, 3/8" and 1/2" drive, 8–32mm',
        'Jack stands and floor jack (3-ton rated)',
        'Spark plugs assorted (common NGK or Denso, 4–8 units)',
        'Serpentine belts (3–5 most common sizes for service area)',
        'Wiper blades assorted (18"–24" common beam blade sizes)',
        'Fluorescent leak detection dye kit with UV flashlight',
        'Brake caliper wind-back tool kit',
        'Parts cleaner / brake cleaner spray (6 cans)',
        'Shop towels, nitrile gloves, oil disposal bags'
      ],
      redFlagsForSeniorTech: [
        'Transmission slipping or refusing to shift — misdiagnosis is expensive',
        'Engine overheating with coolant loss and white exhaust smoke — possible head gasket failure',
        'Electrical gremlins with no clear DTC codes — parasitic draw, CAN bus faults, or wiring harness issues',
        'Engine knock on startup or under load — rod bearing, piston, or oil system failure',
        'Brake pedal going to the floor with no obvious leak — master cylinder or ABS modulator failure',
        'Any job on a hybrid or full EV — high-voltage systems require trained and certified technicians only',
        'Scope creep discovered mid-job (e.g. oil change reveals timing chain issues)',
        'Any vehicle with modified suspension, lift kits, or lowering springs',
        'Full transmission or engine replacement — requires precision re-assembly and programming',
        'ADAS calibration after suspension or windshield work — cameras and radar sensors must be calibrated to strict specs'
      ],
      permitRequiredJobs: [
        'No vehicle-level permits required for standard auto repair',
        'Shop-level permits required for lift installation, above-ground fuel storage, hazmat storage, and spray booth operation'
      ]
    },

    marketing: {
      winBackAngles: [
        { name: 'Oil Change Due Reminder', timing: 'Every 3–6 months by mileage/date', message: 'Your next oil change is due. Use their vehicle mileage and date to send a personalised reminder — highest-converting message in auto.' },
        { name: 'Seasonal Safety Appeal', timing: 'Pre-winter and pre-summer', message: 'It\'s been a while — is your car ready for winter / summer? Customers respond to safety framing for their family\'s vehicle more than price.' },
        { name: 'Specific Tech Observation Follow-Up', timing: 'After any service visit', message: 'We noticed your tires were getting close last visit. Shows attention to detail and gives a concrete reason to come back.' },
        { name: 'Battery Age Alert', timing: 'When battery is 3+ years old', message: 'Your battery is X years old — free battery test this month. Loss-aversion angle. Nobody wants to be stranded.' },
        { name: 'Reactivation Discount', timing: '12+ months inactive', message: 'We miss you — here\'s $25 off your next service. Keep the offer simple and the expiry short (30 days works best).' }
      ],
      upsellMoments: [
        { moment: 'After oil change', pitch: 'Recommend tire rotation, cabin air filter, and engine air filter — all quick add-ons the tech can check while the car is already on the lift.' },
        { moment: 'After brake job', pitch: 'Recommend brake fluid flush. Fluid absorbs moisture over time and should be flushed every 2–3 years. Easy sell after the customer just invested in brakes.' },
        { moment: 'After diagnostic / check engine light', pitch: 'Recommend a full multi-point vehicle inspection. The customer is already in the shop and aware something is off — they\'re primed to hear what else needs attention.' }
      ],
      reviewTiming: 'Send the review request via SMS 30–60 minutes after vehicle pickup — while the relief and satisfaction are fresh. Do not wait until the next day. Include the customer\'s name and a direct one-tap link to Google.',
      referralHook: '$25 off for the referrer and $25 off for the new customer. Frame it as sharing something valuable, not just a discount. "If you know anyone who needs a good mechanic, send them our way."'
    },

    financial: {
      callOutFee: { low: 100, high: 180, note: 'Diagnostic fee is typically credited against the repair if customer proceeds. If they decline the repair, the diagnostic fee stands.' },
      afterHoursPremium: 'Flat fee surcharge of $75–$150 added to the invoice for after-hours or emergency calls. Some larger shops use 25–50% above standard labour rate.',
      materialMarkup: '40–60% markup on parts is industry standard for general repair. Tires are lower (20–30%) due to price transparency. Specialty or dealer-only parts may carry higher markup.',
      paymentTerms: 'Due on completion (same day) for retail customers. Net 15–30 for fleet and commercial accounts.',
      depositPolicy: 'Request a deposit for any job over $500, or for jobs requiring special-order or non-returnable parts. Typically 30–50% of the estimated total. Always collect before ordering parts.',
      invoiceTiers: [
        { size: 'Small', rangeLow: 80, rangeHigh: 280, examples: 'Oil change, wiper blades, battery top-up, tire plug, fluid top-up' },
        { size: 'Medium', rangeLow: 280, rangeHigh: 800, examples: 'Brake pads and rotors, battery replacement, alignment, tire rotation and balance' },
        { size: 'Large', rangeLow: 800, rangeHigh: 2800, examples: 'Alternator, A/C compressor, timing belt kit, strut replacement, catalytic converter' },
        { size: 'Premium', rangeLow: 2800, rangeHigh: 8000, examples: 'Engine replacement, transmission rebuild, head gasket, full suspension overhaul, EV battery service' }
      ],
      changeOrderTriggers: [
        'Tech finds additional damage during brake job (seized caliper, corroded brake line) not visible in the original quote',
        'Parts ordered are found to be incorrect on arrival — alternative part is different price',
        'Diagnosis reveals a more serious underlying issue than the customer originally described',
        'Special-order or OEM parts required instead of the aftermarket option originally priced',
        'Job uncovers prior improper repair that must be corrected before current job can be completed',
        'Customer requests additional work verbally while tech is already on-site'
      ]
    }
  }

  ,

  /* ──────────────────────────────────────────────
     FIT OUT (Commercial & Residential Interior Fit-Outs)
  ────────────────────────────────────────────── */
  'fit-out': {
    meta: {
      id: 'fit-out',
      name: 'Fit Out',
      fullName: 'Interior Fit Out (Commercial & Residential)',
      shortDescription: 'Fit-out contractors transform empty or existing spaces into fully functional interiors. This covers office build-outs, retail store set-ups, restaurant interiors, residential renovations, and tenant improvements. The work spans partitioning, ceiling systems, flooring, joinery, painting, and coordinating sub-trades like electrical, plumbing, and HVAC.',
      customerPainPoint: 'The customer is usually under deadline pressure. A lease has started, a business needs to open, or a homeowner wants to move in. They are worried about timelines slipping, costs blowing out, and coordinating multiple trades without things falling apart.',
      jobCompletionFeeling: 'Walking into a finished space for the first time. The walls are painted, the floors are done, the lighting is perfect, and it looks exactly how they imagined. For a business owner, it means they can finally open their doors. For a homeowner, it finally feels like home.'
    },

    consumerLanguage: [
      { customerSays: 'I need my office built out', techCalls: 'Commercial tenant improvement / office fit-out — partitioning, ceilings, flooring, electrical, data, HVAC modifications' },
      { customerSays: 'Can you do the whole thing or just parts of it?', techCalls: 'Full turnkey fit-out vs. trade-specific scope. Clarify: design, demolition, partitions, MEP coordination, finishes, furniture' },
      { customerSays: 'I want to knock down a wall and open up the space', techCalls: 'Load-bearing wall assessment required. Structural engineer sign-off before demolition. Temporary support needed during work' },
      { customerSays: 'The landlord says I need to do a Cat A to Cat B fit-out', techCalls: 'Cat A = base build (floors, ceilings, basic MEP). Cat B = tenant-specific finishes (partitions, branding, furniture, AV, bespoke joinery)' },
      { customerSays: 'I need a reception desk and some meeting rooms', techCalls: 'Bespoke joinery for reception. Glass or solid partitioning for meeting rooms. Acoustic treatment, AV integration, lighting design' },
      { customerSays: 'Can you match the existing finishes?', techCalls: 'Colour matching, material sourcing from original suppliers. May need sample panels. Existing materials may be discontinued' },
      { customerSays: 'We need to keep the business running during the work', techCalls: 'Phased fit-out with dust barriers, after-hours work, noise restrictions during business hours, temporary access routes' },
      { customerSays: 'How long will this take?', techCalls: 'Depends on scope. Small office (under 2,000 sqft): 3-6 weeks. Medium commercial (2,000-10,000 sqft): 6-12 weeks. Large or complex: 12-24 weeks' },
      { customerSays: 'I want an open-plan layout', techCalls: 'Open ceiling vs. suspended grid. Exposed services need painting/finishing. Acoustic management critical. Power and data in floor boxes or furniture-mounted' },
      { customerSays: 'The plans changed after we started', techCalls: 'Variation order / change order. Re-scope affected trades, update timeline, issue revised quote before proceeding' }
    ],

    jobTypes: [
      { name: 'Small Office Fit-Out (under 2,000 sqft)', priceLow: 15000, priceHigh: 60000, priceType: 'Estimate only', complexity: 'Medium', commonUpsell: 'AV integration, custom joinery, branding wall, smart lighting' },
      { name: 'Medium Commercial Fit-Out (2,000-10,000 sqft)', priceLow: 50000, priceHigh: 250000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Acoustic treatment, raised access floor, security system, signage' },
      { name: 'Retail Store Fit-Out', priceLow: 20000, priceHigh: 150000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Custom display units, point-of-sale integration, LED feature lighting, branded signage' },
      { name: 'Restaurant / Cafe Fit-Out', priceLow: 30000, priceHigh: 200000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Commercial kitchen extraction, bar joinery, acoustic panels, outdoor seating area' },
      { name: 'Residential Renovation (Kitchen/Bathroom/Living)', priceLow: 10000, priceHigh: 80000, priceType: 'Estimate only', complexity: 'Medium', commonUpsell: 'Smart home integration, underfloor heating, custom cabinetry, feature lighting' },
      { name: 'Glass Partition Installation', priceLow: 3000, priceHigh: 15000, priceType: 'T&M', complexity: 'Medium', commonUpsell: 'Frosted film, integrated blinds, acoustic glass upgrade, manifestation graphics' },
      { name: 'Suspended Ceiling Installation', priceLow: 2000, priceHigh: 12000, priceType: 'Per sqft', complexity: 'Medium', commonUpsell: 'LED panel lighting, acoustic tiles upgrade, bulkhead features' },
      { name: 'Commercial Flooring (Carpet Tile / LVT / Polished Concrete)', priceLow: 3000, priceHigh: 25000, priceType: 'Per sqft', complexity: 'Medium', commonUpsell: 'Entrance matting, feature flooring zones, floor preparation/levelling' },
      { name: 'Custom Joinery (Reception Desk / Storage / Shelving)', priceLow: 5000, priceHigh: 30000, priceType: 'Estimate only', complexity: 'Medium', commonUpsell: 'Integrated lighting, cable management, branded elements, soft-close hardware' },
      { name: 'Demolition and Strip-Out', priceLow: 2000, priceHigh: 20000, priceType: 'T&M', complexity: 'Medium', commonUpsell: 'Asbestos survey, waste disposal, structural assessment, temporary works' },
      { name: 'Painting and Decorating (Commercial)', priceLow: 2000, priceHigh: 15000, priceType: 'Per sqft', complexity: 'Simple', commonUpsell: 'Feature wall, wallpaper, brand colour matching, anti-graffiti coating' },
      { name: 'Tenant Make-Good / Reinstatement', priceLow: 5000, priceHigh: 40000, priceType: 'Estimate only', complexity: 'Medium', commonUpsell: 'Dilapidation assessment, project management, early negotiation with landlord' }
    ],

    seasonal: {
      peakMonths: 'January to March (new year, new leases, businesses refreshing). June to August (schools and offices empty, ideal for renovation). September (retail fit-outs before holiday season).',
      slowMonths: 'November and December (holiday disruptions, budget freeze). April can slow if Q1 projects ran over.',
      preSeasonOpportunity: 'October to November — plan and design phase for Q1 builds. Get ahead of the January rush by locking in designs and permits.',
      postSeasonOpportunity: 'After major fit-out completion — offer maintenance packages, snagging visits, and warranty follow-ups.',
      rebookingWindow: 'Commercial tenants typically refit every 5-7 years. Residential renovations every 7-10 years. Annual maintenance touch-ups are a steady revenue stream.',
      campaigns: [
        { period: 'November-December', name: 'Plan Now, Build in January', hook: 'Lock in your design and pricing now so your fit-out starts day one of the new year. No delays, no rush.' },
        { period: 'January-February', name: 'New Year, New Space', hook: 'New lease? New business? Start the year in a space that actually works for your team.' },
        { period: 'May-June', name: 'Summer Build Window', hook: 'The office is quiet, the team is on holiday — perfect time to get your renovation done without disruption.' },
        { period: 'August-September', name: 'Retail Ready', hook: 'Holiday season is coming. Get your store looking its best before the customers arrive.' },
        { period: 'Year-round', name: 'Make-Good Before Lease End', hook: 'Lease ending? Don\'t lose your deposit. We handle reinstatements cleanly and on time.' }
      ]
    },

    intake: {
      firstQuestions: [
        'Is this a new empty space or are we working within an existing fit-out? Any demolition needed first?',
        'Do you have architectural drawings or a design brief, or do you need help with the design and layout?',
        'What is your target completion date and is there a hard deadline (lease start, grand opening, etc.)?'
      ],
      emergencyTriggers: [
        'Water leak discovered during demolition — active flooding risk to neighboring tenants',
        'Structural concern found during wall removal — potential load-bearing wall cut without assessment',
        'Asbestos-containing material discovered during strip-out — stop work immediately, notify building management',
        'Fire alarm or sprinkler system compromised during ceiling work — building safety risk',
        'Gas line or live electrical exposed during demolition — evacuate area',
        'Building inspector flags non-compliant work that could shut down the project',
        'Client business opening delayed and at risk of financial loss due to project overrun'
      ],
      commonMisunderstandings: [
        { customerSays: 'Can\'t you just give me a ballpark price?', tabbyCorrects: 'Fit-out pricing depends heavily on finishes, scope, and site conditions. A site visit and design brief are needed before any meaningful quote.' },
        { customerSays: 'I just want to move a few walls', tabbyCorrects: 'Moving walls can affect fire compartmentation, HVAC distribution, lighting, and electrical. It\'s rarely as simple as it sounds.' },
        { customerSays: 'My landlord said I can do whatever I want', tabbyCorrects: 'Most leases have conditions around modifications. We need to see the lease terms and any landlord approval requirements before starting work.' },
        { customerSays: 'We should be able to do this over a weekend', tabbyCorrects: 'Even small fit-outs need proper preparation, drying times, and inspections. A realistic timeline avoids costly mistakes.' }
      ]
    },

    dispatch: {
      vanStockHighlights: [
        'Metal stud framing — 50mm, 70mm, 92mm profiles with track and noggins',
        'Plasterboard — standard 12.5mm, fire-rated, moisture-resistant (6+ sheets per size)',
        'Jointing compound, tape, corner beads, sanding supplies',
        'Ceiling grid components — main tees, cross tees, wall angles, suspension wire',
        'Acoustic ceiling tiles — standard 600x600mm (2 boxes spare)',
        'Screws — plasterboard, self-tappers, frame fixings, assorted anchors',
        'Sealants — fire-rated, acoustic, general purpose, decorating caulk',
        'PPE — hard hats, dust masks, safety glasses, ear protection, high-vis',
        'Dust sheets, masking tape, edge protection, floor protection board',
        'Laser level, spirit levels, tape measures, chalk line, stud finder'
      ],
      redFlagsForSeniorTech: [
        'Any structural wall modification — needs engineer sign-off before proceeding',
        'Discovery of asbestos-containing materials during strip-out or ceiling removal',
        'Fire-rated partition or door installation — must meet building code requirements',
        'Client wants to change scope mid-project without a formal variation order',
        'Building management imposes unexpected access restrictions or working hour limits',
        'Multiple sub-trades on-site simultaneously with no coordination plan',
        'Heritage or listed building with restrictions on modifications'
      ],
      permitRequiredJobs: [
        'Any structural modification (wall removal, new openings, mezzanine)',
        'Fire compartmentation changes (new fire-rated walls, doors, or penetrations)',
        'Changes to means of egress or exit routes',
        'New or modified mechanical, electrical, or plumbing systems',
        'Accessibility modifications required by ADA or local code',
        'Signage installation on building exterior (may need landlord and council approval)',
        'Commercial kitchen installation (health, fire, ventilation permits)'
      ]
    },

    marketing: {
      winBackAngles: [
        { name: 'Space Refresh', timing: '3-5 years after original fit-out', message: 'Your space has been working hard. A refresh — new paint, updated finishes, better lighting — can transform how your team feels about coming to work.' },
        { name: 'Lease Renewal Opportunity', timing: 'When client is negotiating lease renewal', message: 'Renewing your lease? This is the best time to negotiate a fit-out contribution from your landlord. We can scope it and help you make the case.' },
        { name: 'Post-Completion Snagging', timing: '3-6 months after handover', message: 'How is everything holding up? We offer a complimentary snagging visit to catch anything that needs attention before your warranty period ends.' },
        { name: 'Expansion Build', timing: 'When client business is growing', message: 'Outgrowing your space? We can add meeting rooms, workstations, or reconfigure your layout without shutting down operations.' }
      ],
      upsellMoments: [
        { moment: 'During design phase', pitch: 'Offer AV integration, smart lighting, and acoustic treatment. These are easy to add during construction but expensive to retrofit.' },
        { moment: 'After partition installation', pitch: 'Upsell branded graphics, wayfinding signage, and feature walls. The client is seeing the space take shape and is open to finishing touches.' },
        { moment: 'At handover', pitch: 'Offer an annual maintenance package — touch-up painting, ceiling tile replacement, joinery adjustments. Keeps the space looking new.' }
      ],
      reviewTiming: 'Send the review request on handover day when the client is walking through their finished space for the first time. That is the peak emotional moment. Include a photo of the completed space alongside the review link.',
      referralHook: 'Fit-out clients are well-connected business owners. A simple "Know anyone else moving into a new space?" at handover can generate referrals worth six figures.'
    },

    financial: {
      callOutFee: { low: 0, high: 0, note: 'Fit-out work does not typically have a call-out fee. Site visits for quoting are usually free. Design consultations may be charged ($150-$500) and credited against the project.' },
      afterHoursPremium: '25-50% above standard rates for weekend or after-hours work. Night shifts for occupied buildings typically carry a 30-40% premium.',
      materialMarkup: '15-30% on materials is standard for fit-out. High-end joinery and specialty finishes may carry higher markup. Always itemize materials separately from labour.',
      paymentTerms: 'Progress payments tied to milestones. Typical: 20% deposit, 30% at rough-in, 30% at substantial completion, 20% at final handover and sign-off.',
      depositPolicy: 'Minimum 20% deposit before any work begins. For projects over $50,000, a formal payment schedule tied to project milestones is standard.',
      invoiceTiers: [
        { size: 'Small', rangeLow: 2000, rangeHigh: 15000, examples: 'Single room refresh, painting, minor partition, ceiling repair' },
        { size: 'Medium', rangeLow: 15000, rangeHigh: 60000, examples: 'Small office fit-out, bathroom renovation, retail counter and shelving' },
        { size: 'Large', rangeLow: 60000, rangeHigh: 250000, examples: 'Full office floor fit-out, restaurant build-out, multi-room residential renovation' },
        { size: 'Premium', rangeLow: 250000, rangeHigh: 1000000, examples: 'Multi-floor commercial fit-out, flagship retail, high-end residential whole-home renovation' }
      ],
      changeOrderTriggers: [
        'Hidden services discovered behind walls (pipes, cables, ducts) not shown on as-built drawings',
        'Client changes finish selections after materials are ordered',
        'Building management imposes unexpected requirements not in original scope',
        'Structural engineer requires additional work after opening up walls or ceilings',
        'Asbestos or hazardous material found requiring specialist removal',
        'Client adds rooms, moves walls, or changes layout after construction has started'
      ]
    }
  }

  ,

  /* ──────────────────────────────────────────────
     HEALTH & WELLNESS
  ────────────────────────────────────────────── */
  'health-wellness': {
    meta: {
      id: 'health-wellness',
      name: 'Health & Wellness',
      fullName: 'Health & Wellness Services',
      shortDescription: 'Health and wellness businesses include gyms, personal training studios, yoga and pilates studios, massage therapy clinics, physiotherapy practices, chiropractic offices, medspas, wellness coaching, and holistic health practitioners. The work spans client bookings, treatment plans, membership management, and recurring appointment scheduling.',
      customerPainPoint: 'The client is usually looking to fix a problem — chronic pain, low energy, weight management, stress, or recovery from injury. They are often nervous about committing, unsure which service is right for them, and worried about cost for something that feels optional even though it is not.',
      jobCompletionFeeling: 'After a great session, the client feels physically better and emotionally lighter. They leave thinking "I should have done this sooner." That feeling is what drives rebooking. The practitioner who captures that moment with a follow-up wins the long-term relationship.'
    },

    consumerLanguage: [
      { customerSays: 'My back has been killing me', techCalls: 'Initial assessment required. Could be muscular, skeletal, nerve-related, or referred pain. Determine: acute vs. chronic, onset, aggravating factors' },
      { customerSays: 'I want to get in shape but I don\'t know where to start', techCalls: 'Intake consultation. Assess: current fitness level, injuries/limitations, goals (weight loss, strength, endurance), availability, budget' },
      { customerSays: 'I just need a massage to de-stress', techCalls: 'Relaxation/Swedish massage vs. remedial/deep tissue. Clarify: are there specific pain points or is this purely stress relief?' },
      { customerSays: 'My doctor told me I should see a physio', techCalls: 'Physician referral — may have specific treatment requirements. Request: referral letter, any imaging results, diagnosis details' },
      { customerSays: 'How many sessions will I need?', techCalls: 'Cannot commit to a number without assessment. Typical: 4-6 sessions for acute issues, 8-12 for chronic. Reassess after every 3-4 sessions' },
      { customerSays: 'Do you do package deals?', techCalls: 'Multi-session packages (5-pack, 10-pack) at 10-20% discount. Memberships for recurring visits. Discuss commitment vs. flexibility' },
      { customerSays: 'I tried yoga once and hated it', techCalls: 'Different styles suit different people. Clarify what they disliked: pace, difficulty, environment, instructor style. Suggest alternatives' },
      { customerSays: 'Can you fix my posture?', techCalls: 'Postural assessment. Combination of manual therapy, corrective exercises, and ergonomic advice. Ongoing maintenance, not a one-visit fix' },
      { customerSays: 'I want to lose 20 pounds', techCalls: 'Goal-setting consultation. Assess: timeline expectations, current activity level, nutrition habits, any medical conditions. Set realistic milestones' },
      { customerSays: 'Is this covered by my insurance?', techCalls: 'Depends on service type and provider. Physio, chiro, and some massage may be covered. Client needs to check their plan. Provide itemized receipts for claims' }
    ],

    jobTypes: [
      { name: 'Initial Assessment / Consultation', priceLow: 75, priceHigh: 200, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Multi-session package, treatment plan, take-home exercise program' },
      { name: 'Personal Training Session (1-on-1)', priceLow: 60, priceHigh: 150, priceType: 'Per Session', complexity: 'Simple', commonUpsell: '10-session package, nutrition coaching add-on, body composition tracking' },
      { name: 'Group Fitness Class', priceLow: 15, priceHigh: 40, priceType: 'Per Class', complexity: 'Simple', commonUpsell: 'Unlimited monthly membership, class pack (10/20), private session upgrade' },
      { name: 'Massage Therapy (60 min)', priceLow: 80, priceHigh: 180, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: '90-minute upgrade, add-on hot stones or cupping, monthly membership' },
      { name: 'Physiotherapy Session', priceLow: 100, priceHigh: 250, priceType: 'Per Session', complexity: 'Medium', commonUpsell: 'Treatment package (6-pack), dry needling add-on, home exercise program' },
      { name: 'Chiropractic Adjustment', priceLow: 60, priceHigh: 200, priceType: 'Per Visit', complexity: 'Simple', commonUpsell: 'Maintenance plan (monthly visits), X-ray imaging, corrective exercise program' },
      { name: 'Yoga / Pilates Private Session', priceLow: 80, priceHigh: 180, priceType: 'Per Session', complexity: 'Simple', commonUpsell: 'Semi-private (2-3 people), class membership, workshop series' },
      { name: 'Wellness Coaching Program (Monthly)', priceLow: 200, priceHigh: 600, priceType: 'Monthly', complexity: 'Medium', commonUpsell: 'Nutrition plan add-on, accountability check-ins, corporate wellness package' },
      { name: 'MedSpa Treatment (Facial / Body)', priceLow: 100, priceHigh: 500, priceType: 'Per Treatment', complexity: 'Medium', commonUpsell: 'Treatment series (3-6 sessions), skincare product bundle, membership' },
      { name: 'Corporate Wellness Program', priceLow: 500, priceHigh: 5000, priceType: 'Monthly', complexity: 'Complex', commonUpsell: 'On-site classes, health screenings, mental health workshops, ergonomic assessments' }
    ],

    seasonal: {
      peakMonths: 'January (New Year resolutions). September (back-to-routine after summer). March-April (pre-summer body goals).',
      slowMonths: 'June-August (vacations, outdoor activities replace indoor sessions). November-December (holiday distractions, budget tightening).',
      preSeasonOpportunity: 'December — sell January starter packages and New Year programs before the rush. August — promote September "back to routine" specials.',
      postSeasonOpportunity: 'February — many January starters drop off. Win-back campaign: "Still working on that goal? Let\'s get you back on track."',
      rebookingWindow: 'Wellness services thrive on recurring visits. Weekly or bi-weekly is ideal. Any client who goes 3+ weeks without a visit is at risk of dropping off.',
      campaigns: [
        { period: 'December-January', name: 'New Year, New You', hook: 'Start the year with a plan, not just a promise. Book your assessment now and skip the January waitlist.' },
        { period: 'February-March', name: 'Resolution Rescue', hook: 'Fell off track? No judgment. Let\'s pick up where you left off. One session to get back in the groove.' },
        { period: 'April-May', name: 'Summer Ready', hook: 'Summer is 8 weeks away. That\'s enough time to feel a real difference. Let\'s build a plan that gets you there.' },
        { period: 'August-September', name: 'Back to Routine', hook: 'Summer\'s over. Time to get back to your schedule. Book your first session back and lock in your weekly slot.' },
        { period: 'October-November', name: 'Pre-Holiday Stress Relief', hook: 'The holidays are coming. Build your stress buffer now. A regular session keeps you grounded through the chaos.' }
      ]
    },

    intake: {
      firstQuestions: [
        'What is bringing you in today — is this for a specific issue (pain, injury, recovery) or general wellness and fitness?',
        'Have you seen anyone else for this before, and do you have any medical conditions or injuries we should know about?',
        'What does your ideal outcome look like — what would make you feel like this was worth it?'
      ],
      emergencyTriggers: [
        'Client reports chest pain, dizziness, or difficulty breathing during or after a session — call 911 immediately',
        'Client discloses active suicidal thoughts during a wellness or coaching session — follow crisis protocol',
        'Allergic reaction to a product used during treatment (oils, creams, supplements) — administer first aid, call emergency services if needed',
        'Client injury during a training session or class — assess severity, apply first aid, document incident',
        'Client discloses abuse or harm — follow mandatory reporting requirements for your state',
        'Equipment failure that causes or could cause injury — remove from use, document, report'
      ],
      commonMisunderstandings: [
        { customerSays: 'One session should fix my problem', tabbyCorrects: 'Most conditions take multiple sessions. The first visit is assessment and initial treatment. Real progress comes from consistency over several weeks.' },
        { customerSays: 'Massage is just a luxury', tabbyCorrects: 'Remedial massage is a clinical treatment for pain, tension, and recovery. It is not the same as a spa day. Many insurance plans cover it.' },
        { customerSays: 'I\'m too unfit to start personal training', tabbyCorrects: 'Every program starts where you are right now. The trainer adapts everything to your level. That is literally the point of personal training.' },
        { customerSays: 'My insurance should cover all of this', tabbyCorrects: 'Coverage varies by plan and service type. We can provide itemized receipts for you to submit. Check with your provider before your first visit to avoid surprises.' }
      ]
    },

    dispatch: {
      vanStockHighlights: [
        'Treatment table — portable or fixed, with face cradle and bolster set',
        'Clean linens — fitted sheets, flat sheets, face cradle covers, towels (minimum 10 sets)',
        'Massage oils and lotions — hypoallergenic, unscented base plus 2-3 specialty options',
        'Hot stones set / cupping set / dry needling supplies (as applicable to services offered)',
        'Resistance bands — light, medium, heavy',
        'Foam rollers, yoga blocks, yoga straps, exercise mats',
        'First aid kit including ice packs, bandages, antiseptic, allergy medication',
        'Client intake forms (printed and digital), consent forms, medical history questionnaires',
        'Sanitizer, disinfectant spray, disposable gloves, face masks',
        'Timer, Bluetooth speaker, essential oil diffuser'
      ],
      redFlagsForSeniorTech: [
        'Client presents with symptoms that suggest a medical condition beyond scope of practice — refer to physician',
        'Client has a recent surgery or active injury that has not been cleared by their doctor',
        'Client becomes emotional or discloses mental health crisis during session — needs practitioner with appropriate training',
        'Recurring client showing no improvement after 6+ sessions — reassess treatment plan or refer out',
        'Client requests treatment that is outside the practitioner\'s certification or scope of practice',
        'Insurance or legal claim involved — document everything meticulously',
        'Minor client (under 18) without proper parental consent documentation'
      ],
      permitRequiredJobs: [
        'State or local business license for health and wellness services',
        'Practitioner-specific licenses: massage therapy, physiotherapy, chiropractic, personal training certifications',
        'Health department permits for any treatment involving skin contact, needles, or bodily fluids',
        'Zoning approval if operating from a residential address',
        'Insurance: professional liability (malpractice), general liability, and workers\' compensation',
        'HIPAA compliance documentation if handling protected health information'
      ]
    },

    marketing: {
      winBackAngles: [
        { name: 'We Miss You', timing: '4+ weeks since last visit', message: 'It\'s been a while since your last session. Your body remembers the routine even if your calendar forgot. Book your next visit and pick up where you left off.' },
        { name: 'Progress Check-In', timing: '3 months after treatment plan started', message: 'You\'ve been putting in the work. Let\'s do a progress check to see how far you\'ve come and what to focus on next.' },
        { name: 'Seasonal Reset', timing: 'Start of each season', message: 'New season, new energy. A single session can reset your body and your mindset for the months ahead.' },
        { name: 'Referral Thank You', timing: 'After a referral comes in', message: 'Someone you care about trusted your recommendation. Thank you. Here\'s a session on us as a thank you.' }
      ],
      upsellMoments: [
        { moment: 'After initial assessment', pitch: 'Offer a multi-session package at a discount. The client is motivated and understands the treatment plan. Make commitment easy.' },
        { moment: 'After a great session', pitch: 'Offer a membership for recurring visits. Capture the "I should do this more often" feeling with a simple monthly plan.' },
        { moment: 'At progress milestone', pitch: 'Introduce complementary services. A physio client may benefit from massage. A PT client may benefit from nutrition coaching.' }
      ],
      reviewTiming: 'Send the review request 2-3 hours after the session — when the client is feeling the benefits but before daily life takes over. A text with a direct Google link works best. Personalize it: "Hi Sarah, glad you\'re feeling better today."',
      referralHook: 'Bring a friend and both get 20% off your next session. Health and wellness is deeply personal — a recommendation from a friend carries more weight than any ad.'
    },

    financial: {
      callOutFee: { low: 0, high: 0, note: 'No call-out fee for in-clinic services. Mobile practitioners (home visits) typically add $25-$75 travel fee depending on distance.' },
      afterHoursPremium: 'Early morning (before 7am) and evening (after 7pm) sessions may carry a $10-$30 premium. Weekend rates vary — some practitioners charge standard, others add 15-25%.',
      materialMarkup: 'Product retail (supplements, skincare, equipment) carries 40-100% markup. This is a significant revenue stream for many wellness businesses.',
      paymentTerms: 'Payment at time of service for individual sessions. Packages and memberships are prepaid or auto-billed monthly. Insurance-billed services: file claim, collect copay at time of service.',
      depositPolicy: 'Packages over $500 may offer payment plans. Corporate wellness programs typically invoice monthly or quarterly. Require credit card on file for no-show protection.',
      invoiceTiers: [
        { size: 'Small', rangeLow: 50, rangeHigh: 150, examples: 'Single class, drop-in session, basic massage, short consultation' },
        { size: 'Medium', rangeLow: 150, rangeHigh: 500, examples: 'Assessment + first treatment, 5-session package, initial coaching program' },
        { size: 'Large', rangeLow: 500, rangeHigh: 2000, examples: '10-session package, 3-month coaching program, medspa treatment series' },
        { size: 'Premium', rangeLow: 2000, rangeHigh: 10000, examples: 'Annual membership, corporate wellness program, intensive treatment program, retreat package' }
      ],
      changeOrderTriggers: [
        'Client needs change after assessment — originally booked massage but needs physio referral',
        'Treatment plan needs to be extended beyond original package (more sessions required)',
        'Client adds family members or refers employees for group/corporate pricing',
        'Insurance coverage changes mid-treatment affecting payment responsibility',
        'Client requests services outside original scope (adds nutrition coaching to PT package)',
        'Practitioner recommends imaging or specialist referral that adds cost to the treatment pathway'
      ]
    }
  }

  ,

  /* ──────────────────────────────────────────────
     HOME & OFFICE AUTOMATION
  ────────────────────────────────────────────── */
  'home-and-office-automation': {
    meta: {
      id: 'home-and-office-automation',
      name: 'Home & Office Automation',
      fullName: 'Home & Office Automation (Smart Technology)',
      shortDescription: 'Automation professionals design, install, and maintain smart home and office technology systems. This includes smart lighting, thermostats, security cameras, door locks, audio/video systems, motorized shades, voice assistants, network infrastructure, and whole-building automation. The work ranges from simple smart device setup to fully integrated systems controlled from a single app or panel.',
      customerPainPoint: 'The customer is either overwhelmed by the options and doesn\'t know where to start, or they bought a bunch of smart devices that don\'t talk to each other. They want convenience and control but are frustrated by complexity, unreliable connections, and the feeling that their "smart" home is actually dumb.',
      jobCompletionFeeling: 'When the customer picks up their phone, taps one button, and the lights dim, the blinds close, the music starts, and the thermostat adjusts — all at once. That "wow" moment. Or when they check their front door camera from vacation and everything is secure. That peace of mind is what sells the next project.'
    },

    consumerLanguage: [
      { customerSays: 'I want a smart home', techCalls: 'Needs assessment: which systems (lighting, HVAC, security, AV, shades)? Existing infrastructure? Budget? Ecosystem preference (Apple, Google, Amazon, Control4, Savant)?' },
      { customerSays: 'My smart devices don\'t work together', techCalls: 'Integration issue. Likely: mixed ecosystems, weak Wi-Fi, incompatible protocols (Zigbee vs. Z-Wave vs. Wi-Fi vs. Thread/Matter). Needs hub or unified controller' },
      { customerSays: 'I want to control everything from my phone', techCalls: 'Centralized control platform. Options: native app (basic), Home Assistant (advanced DIY), Control4/Savant/Crestron (professional). Depends on scale and budget' },
      { customerSays: 'Can you set up my security cameras?', techCalls: 'Camera installation: PoE (wired, reliable) vs. Wi-Fi (flexible, less reliable). NVR for local recording vs. cloud subscription. Placement, coverage angles, night vision, notification setup' },
      { customerSays: 'My Wi-Fi is terrible in half the house', techCalls: 'Network assessment. Likely needs: mesh Wi-Fi system or access points, possible ethernet backhaul, dedicated IoT VLAN for smart devices, bandwidth audit' },
      { customerSays: 'I want music in every room', techCalls: 'Whole-home audio: Sonos (wireless, easy), in-ceiling speakers with amplifier (better quality, requires wiring), or commercial-grade with zoning. Streaming source integration' },
      { customerSays: 'Can you make my lights turn on automatically?', techCalls: 'Smart lighting options: smart bulbs (basic), smart switches (better, keeps existing fixtures), or full lighting control system. Automation triggers: time, motion, sunrise/sunset, geofence' },
      { customerSays: 'I want smart locks on all my doors', techCalls: 'Smart lock assessment: door type, deadbolt compatibility, power source (battery vs. hardwired), integration with security system, auto-lock and guest access features' },
      { customerSays: 'We\'re building a new house and want it wired for smart tech', techCalls: 'Pre-wire consultation: Cat6 to every room, speaker wire, HDMI conduit, dedicated electrical circuits, structured wiring panel, conduit for future expansion' },
      { customerSays: 'Our conference room tech never works', techCalls: 'Commercial AV assessment: video conferencing system, display/projector, microphone array, cable management, one-touch meeting start, room scheduling panel' }
    ],

    jobTypes: [
      { name: 'Smart Home Consultation and Design', priceLow: 200, priceHigh: 1000, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Full system installation, pre-wire for new construction, annual maintenance plan' },
      { name: 'Smart Lighting Installation (per room)', priceLow: 200, priceHigh: 800, priceType: 'Per Room', complexity: 'Simple', commonUpsell: 'Dimmer scenes, motion sensors, circadian rhythm programming, outdoor lighting' },
      { name: 'Smart Thermostat Installation', priceLow: 150, priceHigh: 500, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Multi-zone setup, humidity sensors, air quality monitoring, geofencing automation' },
      { name: 'Security Camera System (4-8 cameras)', priceLow: 1500, priceHigh: 5000, priceType: 'Estimate only', complexity: 'Medium', commonUpsell: 'NVR with local storage, smart doorbell, license plate recognition, monitoring service' },
      { name: 'Smart Lock and Access Control', priceLow: 300, priceHigh: 1200, priceType: 'Per Door', complexity: 'Simple', commonUpsell: 'Video doorbell integration, guest access codes, auto-lock scheduling, security system tie-in' },
      { name: 'Whole-Home Audio System', priceLow: 2000, priceHigh: 15000, priceType: 'Estimate only', complexity: 'Medium', commonUpsell: 'In-ceiling speakers, outdoor audio zones, turntable/vinyl integration, dedicated listening room' },
      { name: 'Home Theater / Media Room', priceLow: 3000, priceHigh: 25000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Acoustic treatment, motorized screen, 4K projector, Dolby Atmos, smart lighting scenes' },
      { name: 'Network Infrastructure (Mesh Wi-Fi / Access Points)', priceLow: 500, priceHigh: 3000, priceType: 'Estimate only', complexity: 'Medium', commonUpsell: 'Ethernet backhaul, IoT VLAN, network rack, UPS backup, managed switch' },
      { name: 'Motorized Shade / Blind Installation', priceLow: 500, priceHigh: 2000, priceType: 'Per Window', complexity: 'Medium', commonUpsell: 'Scene integration with lighting, sunrise/sunset automation, solar-powered option' },
      { name: 'Conference Room AV Setup', priceLow: 2000, priceHigh: 15000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Room scheduling panel, wireless presentation, acoustic panels, multi-display, one-touch meeting start' },
      { name: 'Pre-Wire for New Construction', priceLow: 3000, priceHigh: 15000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Structured wiring panel, dedicated circuits, conduit for future, in-wall speaker wire' },
      { name: 'Whole-Home Automation System (Control4 / Savant / Crestron)', priceLow: 10000, priceHigh: 100000, priceType: 'Estimate only', complexity: 'Complex', commonUpsell: 'Touchscreen panels, keypad controllers, remote monitoring, annual programming updates' }
    ],

    seasonal: {
      peakMonths: 'March to May (spring home improvement season). September to November (pre-holiday upgrades, gift-driven installs). January (CES hype drives interest in new tech).',
      slowMonths: 'June to August (vacations, outdoor focus). December (too late for holiday installs, budget spent).',
      preSeasonOpportunity: 'October to November — position smart home upgrades as holiday gifts or pre-holiday security (cameras, locks before travel season).',
      postSeasonOpportunity: 'January to February — many people received smart devices as gifts and need help setting them up or integrating them.',
      rebookingWindow: 'Annual network and system health check. Firmware updates, battery replacements, new feature programming. Smart systems need maintenance like any other system.',
      campaigns: [
        { period: 'January-February', name: 'New Gear, Need Help?', hook: 'Got smart home gadgets for the holidays? We set them up properly so they actually work together.' },
        { period: 'March-April', name: 'Spring Smart Upgrade', hook: 'Spring cleaning for your tech. Upgrade your Wi-Fi, add outdoor cameras, automate your lighting before summer.' },
        { period: 'September-October', name: 'Secure Before You Travel', hook: 'Holiday travel is coming. Smart locks, cameras, and lighting schedules give you peace of mind while you\'re away.' },
        { period: 'November', name: 'Holiday Gift Install', hook: 'Giving smart home tech this holiday? We\'ll install it on Christmas morning so it just works. Book your install date now.' },
        { period: 'Year-round', name: 'System Health Check', hook: 'When was the last time your smart home had a check-up? Firmware updates, battery checks, and optimization keep everything running smooth.' }
      ]
    },

    intake: {
      firstQuestions: [
        'What are you trying to achieve — is this about convenience, security, energy savings, entertainment, or all of the above?',
        'What smart devices or systems do you already have, and are you happy with them or frustrated?',
        'Is this an existing home/office or new construction? And do you have strong Wi-Fi throughout the space?'
      ],
      emergencyTriggers: [
        'Security system offline or cameras down — customer feels vulnerable, especially if they are traveling',
        'Smart lock malfunction — customer locked out of their own home or unable to secure the property',
        'Network completely down — all smart devices offline, no internet, security compromised',
        'Electrical issue discovered during installation — exposed wiring, overloaded circuit, burning smell',
        'Customer reports unauthorized access alerts from smart lock or camera system',
        'Commercial client\'s conference room tech fails before a major meeting or event'
      ],
      commonMisunderstandings: [
        { customerSays: 'Smart home stuff is just plug and play', tabbyCorrects: 'Consumer smart devices are designed to seem simple, but getting multiple devices to work together reliably requires proper network setup, a compatible hub, and configuration.' },
        { customerSays: 'I just need better Wi-Fi', tabbyCorrects: 'More bandwidth does not always fix smart home issues. Many problems are caused by too many devices on one network, interference, or devices using the wrong frequency band. A proper network design solves it.' },
        { customerSays: 'Can\'t I just do this myself with YouTube?', tabbyCorrects: 'You can set up individual devices, but integration, automation scenes, network segmentation, and reliable performance require experience. One misconfigured device can knock out others.' },
        { customerSays: 'Why is this so expensive? The device only costs $50', tabbyCorrects: 'The device is the smallest part of the cost. Wiring, mounting, configuration, integration with other systems, programming automation scenes, and testing all take professional time.' }
      ]
    },

    dispatch: {
      vanStockHighlights: [
        'Ethernet cable — Cat6 bulk spool (500ft), RJ45 connectors, patch cables assorted lengths',
        'Crimping tools, cable tester, tone generator, punchdown tool',
        'Smart switches and dimmers — Lutron Caseta or similar (6 assorted)',
        'Wi-Fi access points — 2 units (common brand for consistency)',
        'PoE switch — 8-port minimum for camera installations',
        'Security camera mounting hardware — brackets, conduit, weatherproof boxes',
        'Low-voltage wire — 18/2 for speakers, 16/4 for in-ceiling speakers, HDMI cables',
        'Wall plates, blank plates, keystone jacks, brush plates for cable pass-through',
        'Laptop with configuration software, USB drives with firmware, spare power adapters',
        'Labeler, cable ties, velcro straps, wall anchors, assorted screws'
      ],
      redFlagsForSeniorTech: [
        'Customer wants to integrate a legacy system (old Crestron, AMX, or proprietary system) with new smart devices',
        'Pre-wire in new construction requires coordination with electrician and builder — timing is critical',
        'Commercial AV installation requiring rack build, programming, and multi-room control',
        'Network issues causing intermittent device failures — requires packet-level troubleshooting',
        'Customer has 50+ smart devices and needs a dedicated automation controller, not a consumer hub',
        'Outdoor installation in extreme weather location requiring weatherproofing and surge protection',
        'Integration with third-party security monitoring service requiring API or protocol bridging'
      ],
      permitRequiredJobs: [
        'Running new electrical circuits (requires licensed electrician in most states)',
        'Exterior camera or device mounting that penetrates building envelope',
        'Low-voltage wiring in new construction (permit requirements vary by jurisdiction)',
        'Commercial installations may require fire alarm coordination and building permits',
        'Motorized shade installation near windows that are fire egress points',
        'Structured wiring installations in conduit (check local low-voltage permit requirements)'
      ]
    },

    marketing: {
      winBackAngles: [
        { name: 'System Upgrade', timing: '12-18 months after installation', message: 'Smart tech moves fast. There are new features and devices that can make your system even better. Want a quick update consultation?' },
        { name: 'Annual Health Check', timing: 'Every 12 months', message: 'Your smart home needs a check-up. Firmware updates, battery replacements, and a quick optimization keep everything running at its best.' },
        { name: 'New Room Addition', timing: 'After initial installation', message: 'Love what we did in the living room? Let\'s bring the same experience to your bedroom, outdoor area, or home office.' },
        { name: 'Holiday Prep', timing: 'October-November', message: 'Traveling for the holidays? Let\'s make sure your cameras, lights, and locks are all updated and working before you leave.' }
      ],
      upsellMoments: [
        { moment: 'During initial consultation', pitch: 'Sell the vision of a unified system, not individual devices. A whole-home plan costs more upfront but saves money vs. piecemeal additions.' },
        { moment: 'After lighting installation', pitch: 'Motorized shades are the natural next step — they integrate with the same scenes and transform the room experience.' },
        { moment: 'After camera installation', pitch: 'Smart locks and a video doorbell complete the security picture. The customer is already thinking about protection.' }
      ],
      reviewTiming: 'Send the review request the evening after installation — when the customer has had a few hours to play with their new system and show it off to family. The "wow" factor is still fresh.',
      referralHook: 'Smart home owners love showing off their setup. Give them a referral card: "Show your friends what your home can do. If they book, you both get $100 off." Word of mouth is the #1 driver in this industry.'
    },

    financial: {
      callOutFee: { low: 75, high: 200, note: 'Service call fee for troubleshooting existing systems. Typically credited against repair or upgrade work. New project consultations are often free.' },
      afterHoursPremium: 'After-hours and weekend work carries a 25-50% premium. Emergency calls (security system down, lockout) may carry a flat $150-$250 emergency fee.',
      materialMarkup: '25-40% on hardware and devices. High-end systems (Control4, Savant, Crestron) carry dealer pricing with 30-50% margin. Always itemize hardware separately from labour.',
      paymentTerms: 'Small jobs (under $1,000): due on completion. Medium jobs: 50% deposit, 50% on completion. Large projects ($5,000+): milestone payments. Commercial: Net 30.',
      depositPolicy: 'Minimum 50% deposit before ordering equipment. Custom or special-order items are non-refundable once ordered. Clearly communicate this in the proposal.',
      invoiceTiers: [
        { size: 'Small', rangeLow: 150, rangeHigh: 800, examples: 'Smart thermostat install, single-room lighting, device troubleshooting, smart lock install' },
        { size: 'Medium', rangeLow: 800, rangeHigh: 5000, examples: 'Multi-room lighting, camera system (4-8), network overhaul, motorized shades (3-5 windows)' },
        { size: 'Large', rangeLow: 5000, rangeHigh: 25000, examples: 'Whole-home audio, home theater, pre-wire package, full security system' },
        { size: 'Premium', rangeLow: 25000, rangeHigh: 150000, examples: 'Whole-home automation (Control4/Savant), new construction pre-wire + install, commercial AV build-out' }
      ],
      changeOrderTriggers: [
        'Existing wiring is not compatible or not present where expected — new runs required',
        'Customer adds rooms or devices to the scope after installation has begun',
        'Wi-Fi infrastructure inadequate for planned devices — network upgrade required first',
        'Hidden construction issues (concrete walls, no attic access) make planned wire routes impossible',
        'Device compatibility issue discovered — alternative product needed at different price point',
        'Customer upgrades from consumer-grade to professional-grade system mid-project'
      ]
    }
  }

  ,

  /* ──────────────────────────────────────────────
     HANDYMAN
  ────────────────────────────────────────────── */
  handyman: {
    meta: {
      id: 'handyman',
      name: 'Handyman',
      fullName: 'Handyman & General Maintenance Services',
      shortDescription: 'Handyman businesses handle a wide range of small to medium home and office repairs, installations, and maintenance tasks. From fixing a leaky faucet to assembling furniture, mounting TVs, patching drywall, replacing fixtures, and tackling that never-ending to-do list that homeowners and property managers never get around to. The work is varied, fast-paced, and covers nearly every trade at a basic to intermediate level.',
      customerPainPoint: 'The customer has a list of small jobs that no specialist wants to take on because they are too small individually. They have been putting them off for months (sometimes years). They just want someone reliable who shows up on time, does good work, charges fairly, and gets through the list without drama.',
      jobCompletionFeeling: 'Relief and satisfaction. The dripping tap is finally fixed. The shelf is up. The door doesn\'t stick anymore. It is not dramatic — it is the quiet satisfaction of things actually working the way they should. The customer thinks: "Why didn\'t I call sooner?"'
    },

    consumerLanguage: [
      { customerSays: 'I have a list of odd jobs', techCalls: 'Multi-task visit. Get the full list upfront: estimate time per task, prioritize with the customer, quote for the block of time. Common: 3-5 tasks per visit' },
      { customerSays: 'My tap is dripping', techCalls: 'Faucet repair: likely washer, cartridge, or O-ring replacement. Check if standard or proprietary cartridge. May need to shut off water supply' },
      { customerSays: 'Can you mount my TV?', techCalls: 'TV mounting: wall type (drywall, brick, concrete), stud location, bracket type (fixed, tilt, full-motion), cable concealment (surface or in-wall), size and weight of TV' },
      { customerSays: 'I need some shelves put up', techCalls: 'Shelf installation: wall type, weight capacity needed, bracket style (floating, bracketed, built-in). Check for pipes/wires in wall. Level and secure to studs if heavy' },
      { customerSays: 'My door is sticking', techCalls: 'Door adjustment: likely needs planing, hinge adjustment, or strike plate repositioning. Check for swelling (moisture), frame shift, or settling' },
      { customerSays: 'There\'s a hole in my wall', techCalls: 'Drywall repair: small (nail/screw hole = spackle), medium (fist-size = patch kit), large (needs new drywall section, tape, mud, sand, paint match)' },
      { customerSays: 'Can you assemble some furniture?', techCalls: 'Furniture assembly: IKEA or similar flat-pack. Check: number of items, complexity, tools needed. Anchor to wall if tall/heavy (child safety)' },
      { customerSays: 'My toilet keeps running', techCalls: 'Toilet repair: likely flapper valve, fill valve, or flush valve issue. May need full internal rebuild kit. Check for phantom flush vs. constant run' },
      { customerSays: 'I need a ceiling fan installed', techCalls: 'Ceiling fan install: check existing electrical box (must be fan-rated), wiring, switch type (pull chain, wall switch, remote). May need new box and brace' },
      { customerSays: 'Can you do a bit of everything?', techCalls: 'This is the handyman sweet spot. Book a half-day or full-day block. Get the complete task list in advance so the right tools and materials are loaded' }
    ],

    jobTypes: [
      { name: 'General Repair Visit (2-hour minimum)', priceLow: 150, priceHigh: 350, priceType: 'Hourly (min 2hrs)', complexity: 'Simple', commonUpsell: 'Half-day block (4 hrs), recurring monthly visit, additional tasks from the "while you\'re here" list' },
      { name: 'Half-Day Block (4 hours)', priceLow: 300, priceHigh: 600, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Full-day block, recurring schedule, priority booking' },
      { name: 'Full-Day Block (8 hours)', priceLow: 500, priceHigh: 1000, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Multi-day project, property management contract, seasonal maintenance package' },
      { name: 'TV Mounting', priceLow: 100, priceHigh: 350, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Cable concealment, sound bar mount, power outlet relocation, additional TVs' },
      { name: 'Furniture Assembly', priceLow: 80, priceHigh: 300, priceType: 'Per Item', complexity: 'Simple', commonUpsell: 'Wall anchoring, additional items, shelf installation, closet organizer setup' },
      { name: 'Drywall Repair and Patch', priceLow: 100, priceHigh: 400, priceType: 'Per Patch', complexity: 'Simple', commonUpsell: 'Full wall repaint, texture matching, multiple patches at volume discount' },
      { name: 'Faucet or Fixture Replacement', priceLow: 120, priceHigh: 350, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Replace all bathroom fixtures, upgrade to touchless, add under-sink shut-off valves' },
      { name: 'Door Repair / Adjustment / Replacement', priceLow: 100, priceHigh: 500, priceType: 'Per Door', complexity: 'Simple', commonUpsell: 'New hardware, weatherstripping, door sweep, deadbolt installation' },
      { name: 'Ceiling Fan Installation', priceLow: 150, priceHigh: 400, priceType: 'Flat Rate', complexity: 'Medium', commonUpsell: 'Dimmer switch, additional fans, smart fan switch, light kit upgrade' },
      { name: 'Toilet Repair / Replacement', priceLow: 100, priceHigh: 500, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Wax ring replacement, shut-off valve upgrade, bidet seat installation, new toilet installation' },
      { name: 'Picture Hanging / Art Installation', priceLow: 75, priceHigh: 250, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Gallery wall layout, heavy mirror mounting, floating shelf addition' },
      { name: 'Caulking and Weatherproofing', priceLow: 80, priceHigh: 300, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Window seal replacement, door sweep, attic hatch insulation, draft-proofing package' },
      { name: 'Pressure Washing (Deck / Driveway / Patio)', priceLow: 150, priceHigh: 500, priceType: 'Flat Rate', complexity: 'Simple', commonUpsell: 'Deck staining/sealing, gutter cleaning, exterior window wash' },
      { name: 'Property Management Maintenance Visit', priceLow: 200, priceHigh: 600, priceType: 'Per Visit', complexity: 'Medium', commonUpsell: 'Monthly retainer, priority emergency call-out, seasonal inspection package' }
    ],

    seasonal: {
      peakMonths: 'March to June (spring home improvement, move-in/move-out season). September to November (pre-winter prep, holiday hosting prep).',
      slowMonths: 'January to February (post-holiday budget recovery). July to August (vacations, outdoor focus).',
      preSeasonOpportunity: 'February to March — "Spring Fix-Up" packages. Offer a half-day visit to knock out the winter to-do list before summer.',
      postSeasonOpportunity: 'November to December — "Holiday Ready" packages. Quick fixes before guests arrive: fix that bathroom door, mount the new TV, patch the wall.',
      rebookingWindow: 'Handyman customers always have another list. The key is asking before they leave: "What else has been bugging you?" Monthly or quarterly visits for property managers.',
      campaigns: [
        { period: 'February-March', name: 'Spring Fix-Up', hook: 'Winter is over. Let\'s knock out that to-do list you\'ve been ignoring. Book a half-day and get it all done at once.' },
        { period: 'May-June', name: 'Move-Ready Package', hook: 'Moving in or out? We handle the mounting, patching, painting, and fixing so you don\'t have to.' },
        { period: 'September-October', name: 'Pre-Winter Prep', hook: 'Seal the drafts, fix the gutters, weatherproof the doors. Get your home ready for winter in one visit.' },
        { period: 'November', name: 'Holiday Ready', hook: 'Guests coming? Fix the squeaky door, mount the TV, patch the wall. One visit, everything done before they arrive.' },
        { period: 'Year-round', name: 'Monthly Maintenance Club', hook: 'For property managers and busy homeowners: a set number of hours each month for whatever needs fixing. No call-out fees, priority booking.' }
      ]
    },

    intake: {
      firstQuestions: [
        'Can you walk me through your to-do list? I want to get the full picture so we can plan the visit properly and bring the right tools and materials.',
        'Are any of these jobs time-sensitive — like something leaking, broken, or a safety concern — or is this more of a general catch-up?',
        'Is this your home, a rental, or a property you manage? Just helps us understand who is making the decisions and approving the work.'
      ],
      emergencyTriggers: [
        'Active water leak — even a small drip can cause major damage if left overnight. Prioritize and dispatch',
        'Broken exterior door or lock — security risk, especially at night or if the customer lives alone',
        'Gas smell — do NOT attempt to fix. Advise customer to leave the home and call the gas company. This is not a handyman job',
        'Electrical issue with sparking, burning smell, or exposed wires — refer to licensed electrician immediately',
        'Broken window — security and weather exposure risk. Board up or emergency glass replacement',
        'Toilet overflow or sewage backup — water damage risk. Shut off water, contain, and dispatch'
      ],
      commonMisunderstandings: [
        { customerSays: 'Can you just take a quick look at it?', tabbyCorrects: 'A "quick look" is a visit. We charge a minimum of 1-2 hours because travel time and setup are the same regardless. We\'ll make sure you get value from every minute.' },
        { customerSays: 'It should only take 5 minutes', tabbyCorrects: 'It might take 5 minutes of actual work, but there is travel, setup, assessment, and cleanup. We recommend grouping small tasks together to get the most from a visit.' },
        { customerSays: 'Can you do electrical / plumbing / gas work?', tabbyCorrects: 'We handle basic fixtures and minor repairs. Anything involving the main electrical panel, gas lines, or significant plumbing modifications needs a licensed specialist. We can refer you.' },
        { customerSays: 'I already bought the parts', tabbyCorrects: 'Great — just make sure they are the right ones. Send us photos or model numbers before the visit so we can confirm compatibility and avoid a wasted trip.' },
        { customerSays: 'My landlord said I can get someone in', tabbyCorrects: 'We\'re happy to help. Just confirm in writing that the property owner approves the work, especially for anything that modifies the property (drilling, painting, fixture changes).' }
      ]
    },

    dispatch: {
      vanStockHighlights: [
        'Cordless drill/driver + impact driver with full bit set',
        'Stud finder, laser level, tape measure, speed square, chalk line',
        'Assorted screws, anchors, wall plugs, toggle bolts, nails, brad nails',
        'Drywall repair kit — patches, spackle, mesh tape, putty knives, sanding sponge',
        'Caulk gun + assorted caulks (silicone, paintable latex, kitchen/bath)',
        'Plumbing basics — plunger, adjustable wrench, pipe tape, faucet washers, supply lines, wax ring',
        'Painting supplies — small roller, brushes, painters tape, drop cloth, touch-up paint containers',
        'TV mounting hardware — assorted brackets (fixed, tilt, full-motion), lag bolts, cable covers',
        'Furniture assembly tools — Allen keys (metric + imperial), rubber mallet, furniture pads',
        'Electrical basics — voltage tester, wire nuts, outlet covers, switch plates, GFCI outlets',
        'Pressure washer (truck-mounted or portable) with surface cleaner attachment',
        'Step ladder (6ft) and extension ladder (16ft)'
      ],
      redFlagsForSeniorTech: [
        'Job requires working in the main electrical panel or breaker box — refer to licensed electrician',
        'Plumbing job involves main water line, water heater, or sewer line — refer to licensed plumber',
        'Any job involving gas appliances or gas lines — refer to licensed gas fitter',
        'Structural modifications — load-bearing walls, support beams, foundation work — refer to contractor',
        'Customer wants work done without landlord approval on a rental property',
        'Mold discovered behind drywall during repair — needs professional remediation assessment',
        'Job scope creep — customer keeps adding "one more thing" beyond what was quoted'
      ],
      permitRequiredJobs: [
        'Most handyman work does NOT require permits (that is the advantage of staying within scope)',
        'Exception: ceiling fan installation where new electrical box or wiring is required',
        'Exception: any plumbing work beyond basic fixture swaps (varies by jurisdiction)',
        'Exception: deck repair or modification above a certain size threshold',
        'Exception: window replacement (energy code and egress requirements in some states)',
        'When in doubt, check local jurisdiction. Handyman licensing requirements vary by state and city'
      ]
    },

    marketing: {
      winBackAngles: [
        { name: 'The List is Back', timing: '3-6 months after last visit', message: 'Your to-do list has been growing again, hasn\'t it? Book a half-day and let\'s knock it out before it gets any longer.' },
        { name: 'Move-In / Move-Out', timing: 'Seasonal (May-June, August-September)', message: 'Moving? We handle the mounting, patching, cleaning, and fixing. One call gets it all done.' },
        { name: 'Property Manager Retainer', timing: 'After 2+ one-off visits from a property manager', message: 'You\'ve called us twice now. A monthly retainer gives you priority booking and a set number of hours — no more chasing individual quotes.' },
        { name: 'Seasonal Check-In', timing: 'Start of each season', message: 'New season, new fixes. Spring: gutters, outdoor prep. Fall: weatherproofing, pre-winter check. One visit, peace of mind.' }
      ],
      upsellMoments: [
        { moment: 'While on-site for one job', pitch: 'Ask "What else has been bugging you?" Most customers have 2-3 more small jobs they have been putting off. Capture them on the spot.' },
        { moment: 'After completing a task list', pitch: 'Offer a recurring visit: "I can come back every quarter and keep on top of things before they pile up." Property managers especially love this.' },
        { moment: 'When a job is beyond scope', pitch: 'Refer to a specialist (electrician, plumber, contractor) from your network. The customer appreciates the honesty and comes back for everything else.' }
      ],
      reviewTiming: 'Send the review request the same evening after the visit. The customer has been walking around noticing all the things that are finally fixed. That satisfaction is highest on day one. A text with a Google link and a simple "How did we do today?" works best.',
      referralHook: 'Handyman referrals are gold. Everyone knows someone with a to-do list. Offer $25 off their next visit for every referral that books. Keep it simple and easy to share.'
    },

    financial: {
      callOutFee: { low: 50, high: 150, note: 'Minimum visit charge (typically equivalent to 1 hour of labour). Credited against work performed. Some charge a flat minimum of 2 hours.' },
      afterHoursPremium: 'After-hours work is uncommon for general handyman. Emergency calls (burst pipe, broken lock) carry a flat $75-$150 premium or 50% above hourly rate.',
      materialMarkup: '20-40% markup on materials purchased for the job. Many handymen bill materials at cost plus a 20% handling fee. Always provide receipts.',
      paymentTerms: 'Due on completion for residential. Property management accounts: Net 15 to Net 30. Recurring clients: monthly invoicing.',
      depositPolicy: 'No deposit for standard visits (under $500). For larger jobs or material-heavy work, request 50% upfront to cover materials before starting.',
      invoiceTiers: [
        { size: 'Small', rangeLow: 100, rangeHigh: 300, examples: 'Single repair, TV mount, faucet fix, furniture assembly (1 item), picture hanging' },
        { size: 'Medium', rangeLow: 300, rangeHigh: 700, examples: 'Half-day block (3-5 tasks), ceiling fan install, multiple patches and paint, door replacement' },
        { size: 'Large', rangeLow: 700, rangeHigh: 1500, examples: 'Full-day block (6-10 tasks), deck repair, bathroom fixture overhaul, move-out prep package' },
        { size: 'Premium', rangeLow: 1500, rangeHigh: 5000, examples: 'Multi-day project, full property turnover prep, seasonal maintenance contract (quarterly)' }
      ],
      changeOrderTriggers: [
        'Customer adds tasks to the list after the visit has started — quote the additional time before proceeding',
        'Hidden damage found behind a repair (rotted wood behind drywall, corroded pipe behind faucet)',
        'Customer-supplied parts are incorrect or incompatible — need to source correct ones',
        'Job turns out to require a licensed specialist — handyman cannot proceed (electrical, gas, structural)',
        'Access issues — attic too tight, crawl space too confined, or wall cavity too crowded for the planned repair',
        'Multiple coats of paint required where one was expected due to colour mismatch or surface condition'
      ]
    }
  }

};
