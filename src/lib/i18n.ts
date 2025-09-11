// src/lib/i18n.ts
import i18next from 'i18next';

let initialLang = 'en';

// Проверяем, есть ли объект window (а значит, и localStorage)
if (typeof window !== 'undefined') {
  console.log( localStorage.getItem('language'))
  initialLang = localStorage.getItem('language') || 'ru';
}

i18next.init({
  lng: initialLang, // Язык по умолчанию
  fallbackLng: 'en', // Язык, если перевод отсутствует
  resources: {
    en: {
      translation: {
        // ----- Общие переводы
        home: 'Home',
        future: 'Future',
        about: 'About Us',
        qa: 'Q & A',
        stats: 'Statistics',
        login: 'Login',
        signup: 'Sign up',
        profile: 'Profile',

        // ----- hero
        hero: {
          title: {
            line1: 'Distributed',
            line2: 'Efficient Shipping'
          },
          subtitle: 'Multiply speed, create value.',
          button: {
            start: 'Get started',
            profile: 'Go to profile'
          }
        },

        // ----- partners
        partners: {
          title: 'Our Partners Around the World',
          subtitle: 'We work with cities and countries, providing world-class logistics.'
        },

        // ----- cities
        cities: {
          moscow: 'Moscow',
          newyork: 'New York',
          tokyo: 'Tokyo',
          london: 'London',
          berlin: 'Berlin',
          sydney: 'Sydney',
          dubai: 'Dubai',
          paris: 'Paris'
        },

        // ----- futureSection
        futureSection: {
          title: 'Invest in logistics — the future starts today!',
          button: {
            show: 'Learn more',
            hide: 'Hide details'
          },
          details: {
            title: 'Why is logistics the future?',
            description:
              'Logistics is the backbone of global trade and the economy. From ancient times, starting with the Silk Road trade routes and ending with modern container shipping, logistics has connected markets and accelerated economic growth.',
            history: {
              title: 'Historical Resilience',
              description:
                'Since the creation of the first trade caravans and sea routes, logistics has continuously evolved. The Industrial Revolution gave rise to railroads and maritime transport, while in the 20th century, aviation and container shipping changed the world forever. Today, logistics remains a resilient industry influenced only by technological progress.'
            },
            stability: {
              title: 'Safety and Opportunities',
              description:
                'Investments in logistics are considered some of the most stable. Even during crises, goods must move, and technology makes the process safer and more predictable.'
            },
            ai: {
              title: 'The Impact of AI on Logistics',
              description:
                'Artificial intelligence is changing the game in logistics. Machine learning algorithms allow for demand forecasting, route optimization, cost reduction, and improved delivery. Autonomous vehicles and drones will soon become standard in logistics, and smart warehouses will significantly enhance the efficiency of storage and shipment.'
            }
          }
        },

        // ----- investments
        investments: {
          title: 'Investments in Logistics',
          description1:
            'Logistics plays a crucial role in the global economy. Develop warehouse capacity, transport infrastructure, and eco-friendly technologies to achieve success.',
          description2:
            'Learn more about various directions of investment in logistics: warehousing systems, electric transport, maritime and air transportation.',
          carouselLabel: 'Investments in Logistics',
          shortDescriptions: {
            plane: '10-20 billion $ per year',
            truck: '50-70 billion $ per year',
            cargo: '50-60 billion $ per year',
            internet: '150-170 billion $ per year',
            train: '90-95 billion $ per year',
            papers: '5-7 billion $ per year'
          },
          icons: {
            cargoIcon: 'Cargo Icon',
            truckIcon: 'Truck Icon',
            internetIcon: 'Internet Icon',
            trainIcon: 'Train Icon',
            planeIcon: 'Plane Icon',
            papersIcon: 'Papers Icon'
          },
          titles: {
            seaTransport: 'Maritime Transport',
            landTransport: 'Land Transport',
            digitalization: 'Digitalization',
            electricTransport: 'Electric Transport',
            airTransport: 'Air Transport',
            optimization: 'Optimization'
          },
          descriptions: {
            seaTransportDesc: 'Modernization of ports and shipping.',
            landTransportDesc: 'Movement of goods by trucks.',
            digitalizationDesc: 'Development of logistics IT solutions.',
            electricTransportDesc: 'Investments in electric trucks and eco-friendly transport.',
            airTransportDesc: 'Movement of goods by aircraft.',
            optimizationDesc: 'Development and setup of logistics economics.'
          }
        },

        // ----- investmentPercent
        investmentPercent: {
          title: 'Калькулятор роста инвестиций',
          button: {
            show: 'Показать детали',
            hide: 'Скрыть детали'
          },
          details: {
            title: 'Почему инвестировать сейчас?',
            description: 'Текст о деталях инвестиций...',
            history: {
              title: 'История инвестиций',
              description: 'Немного исторической справки...'
            },
            stability: {
              title: 'Стабильность и доходность',
              description: 'Почему это стабильно...'
            },
            ai: {
              title: 'ИИ в инвестициях',
              description: 'Как ИИ помогает в инвестировании...'
            }
          }
        },

        // ----- possibilities (НОВАЯ СЕКЦИЯ)
        possibilities: {
          title: 'Discover the world of investments',
          description: 'Join thousands of successful investors and grow your assets.',
          stats: {
            investors: 'Investors',
            assets: 'Assets Under Management',
            projects: 'Projects'
          }
        },

        whatWeDo: {
          title: 'Our Contribution to Capital Growth',
          description: 'We provide comprehensive solutions for transportation, warehousing, and digital logistics, helping businesses to grow and develop. Our team of experts specializes in optimizing all stages of logistics processes – from route planning and transport flow management to automating warehouse operations and implementing advanced IT solutions.',
          cards: {
            modernization: {
              title: 'Modernization',
              description: 'Our company reviews and implements new solutions into existing logistics chains.'
            },
            creation: {
              title: 'Creation',
              description: 'We offer a complete range of solutions for developing new logistics companies “turnkey”.'
            },
            digitalization: {
              title: 'Digitalization',
              description: 'Developing IT solutions for the logistics industry. We implement supply chain management systems and analytical platforms.'
            }
          }
        },

        infoBlock: {
          title: 'Logistics Information',
          paragraphs: {
            transport: 'Transport is an investment in acquiring and upgrading a fleet of vehicles, rail cars, ships, and aircraft. It increases speed, reliability, and flexibility of deliveries while reducing transportation costs.',
            warehouse: 'Warehousing infrastructure involves constructing and upgrading warehouses, terminals, and distribution centers. Optimizing warehouse networks speeds up cargo handling and reduces storage costs.',
            automation: 'Automation includes investments in digital technologies, robotics, WMS systems, and AI. They boost the efficiency of logistics processes, reduce errors, and speed up order fulfillment.'
          },
          boxes: {
            box1: 'Warehouse',
            box2: 'Automation',
            box3: 'Transport'
          }
        },

        faq: {
          "0": {
            question: "Is logistics safe?",
            answer: 
              "Modern logistics relies on a set of measures to ensure safety at every stage of transportation.\n\n" +
              "GPS tracking: Real-time vehicle monitoring helps control routes, detect deviations, and respond quickly to emergencies.\n" + 
              "Video surveillance systems: Internal and external cameras in trucks keep an eye on loading and unloading operations.\n" +
              "Cargo insurance: Leading companies insure cargo, covering damage, theft, and force majeure.\n" + 
              "Driver monitoring systems: Driver fatigue detection (DMS) prevents accidents. For instance, the Wialon system records harsh braking, lane changes, and violations of work-rest regulations.\n" + 
              "Example: DHL, a major logistics operator, uses Resilience360 to monitor risks on routes worldwide."
          },
          "1": {
            question: "Which technologies are used in modern logistics?",
            answer:
              "Logistics today is a high-tech field. Key solutions include:\n\n" +
              "TMS (Transport Management System): Automates route planning, cost accounting, and cargo tracking.\n" +
              "IoT sensors: Temperature, humidity, and vibration sensors ensure proper shipping conditions, especially in pharmaceutical and food sectors.\n" +
              "Big Data and analytics: Analyzing large data sets to predict delays, optimize routes, and identify bottlenecks.\n" +
              "Warehouse Management Systems (WMS): Robotized warehouses speed up order fulfillment and reduce human error.\n" +
              "Blockchain: A transparent and secure supply chain, where every participant can see each step of the shipment.\n" +
              "Example: Amazon actively implements warehouse robotics and uses drones for delivery."
          },
          "2": {
            question: "What is a supply chain, and why is it important?",
            answer:
              "A supply chain is the set of processes from producing goods to delivering them to the end consumer.\n\n" +
              "It includes:\n" + 
              "Raw material procurement → Production → Storage → Transportation → Distribution → Retail.\n" +
              "Any disruption in the chain leads to delays, losses, and additional costs.\n" +
              "Example: In 2021, the global supply chain crisis caused by COVID-19 led to a tenfold increase in container shipping costs and significant delivery delays worldwide. Companies using automation and supplier diversification (e.g., Zara) adapted faster."
          },
          "3": {
            question: "What are the risks in logistics, and how are they handled?",
            answer:
              "Key risks:\n\n" +
              "Delays: Weather conditions, traffic jams, vehicle breakdowns.\n" +
              "→ Solution: Alternative routes, AI-based forecasting.\n" +
              "Theft: Especially valuable goods.\n" +
              "→ Solution: Alarm systems, satellite security, tamper-evident seals.\n" +
              "Cargo damage: Violation of storage conditions.\n" +
              "→ Solution: Cold chain solutions, IoT temperature monitoring.\n" +
              "Human factor: Loading errors, driver fatigue.\n" +
              "→ Solution: Automation, enforcing work-rest schedules, training.\n" +
              "Example: Nestlé uses digital platforms for real-time supply monitoring and product quality control."
          },
          "4": {
            question: "How do logistics companies make money, and how are earnings distributed?",
            answer:
              "Revenue sources:\n\n" +
              "Freight rates.\n" +
              "Warehousing and storage services.\n" +
              "Additional services (insurance, forwarding).\n" +
              "Route optimization and cost reduction.\n" +
              "Profitability depends on transport utilization, process optimization, and technology implementation.\n" +
              "Example: The Russian company Delovye Linii implemented its own TMS, reducing empty runs and boosting profitability."
          },
          "5": {
            question: "What are the environmental trends in logistics?",
            answer:
              "Electric trucks: Tesla Semi, Volvo Electric Trucks.\n" +
              "Route optimization: Lower mileage = fewer emissions.\n" +
              "Eco-friendly forklifts: Electric forklifts in warehouses.\n" +
              "Cargo drones: Potential for quick delivery with a low carbon footprint.\n" +
              "Example: Maersk invests in methanol-powered ships, cutting CO2 emissions by 70%."
          },
          "6": {
            question: "How fast is the logistics market growing?",
            answer:
              "The global logistics market is valued at $9.6 trillion (2023) and is projected to grow at 6-8% annually. Key areas include:\n\n" +
              "E-commerce (e.g., Amazon, Alibaba).\n" +
              "Cold chain (transportation of food, vaccines).\n" +
              "Last-mile delivery.\n" +
              "Example: In Russia, CDEK expanded from 1,000 to 4,500 pickup points over 5 years."
          },
          "7": {
            question: "Why is investing in logistics so promising?",
            answer:
              "Constant growth in freight turnover.\n" +
              "Digitalization reduces costs and increases transparency.\n" +
              "High margins in warehousing logistics.\n" +
              "Stable demand – goods always need to be moved.\n" +
              "Example: The 2016 IPO of Chinese logistics company ZTO Express raised $1.4 billion, becoming the largest transportation IPO on the NYSE."
          }
        },

        investmentInfo: {
          title: 'Logistics Information',
          paragraphs: {
            p1: 'The global logistics industry is showing significant growth and is attracting substantial investment. In 2021, investment in logistics startups reached a record $24.6 billion, almost double the 2020 figure of $12.6 billion. This growth is driven by increased attention to supply chains and the need for modernization amid the COVID-19 pandemic. (TRANS.INFO)',
            p2: 'In the first half of 2022, investments in logistics infrastructure totaled around $34 billion, up 13% compared to the same period of the previous year. The main driver of this growth is the development of e-commerce, which grew by 13.3% in 2021 to approximately €88.1 billion. (MORDOR INTELLIGENCE)',
            p3: 'Overall, despite current economic and geopolitical challenges, the logistics industry continues to attract significant investment, reflecting its key role in ensuring efficient supply chains and meeting the growing needs of the global economy. (PWC)',
          },
          boxes: {
            b1: 'TRANS.INFO',
            b2: 'M.INT',
            b3: 'PWC'
          },
          chartTitle: 'Chart of Investments in Logistics Startups'
        },

        futureProjects: {
          title: 'Logistics Prospects',
          paragraph: 'Forecasts indicate further growth of the global logistics services market, which may reach 100 billion euros by 2026, largely due to the rapid development of e-commerce. (FINAM)',
          sectors: [
            { name: 'Warehousing Systems' },
            { name: 'Transport Infrastructure' },
            { name: 'Digitalization' },
            { name: 'Eco-Friendly Transport' },
            { name: 'Maritime Logistics' }
          ]
        },

        investText: {
          title: 'Investing in Logistics',
          paragraphs: {
            p1: 'Logistics is the backbone of the global economy. Developing warehouse systems, implementing digital technologies, and improving transport infrastructure enable companies to optimize costs and increase efficiency.',
            p2: 'With the growing demand for eco-friendly solutions, investments in electric transport and reducing carbon footprints are becoming a priority. Supporting these areas helps preserve nature and improve quality of life.',
            p3: 'By choosing logistics as an investment sector, you are investing in the future of the global economy.'
          }
        },

        footer: {
          copyright: '© 2023 Distributed Efficient Shipping LTD - ALL RIGHTS RESERVED',
          support: 'Support email: support-contact@des.com',
          terms: 'Terms of Use',
          certificate: 'Certificate'
        },
        auth: {
          signin: {
            title: 'Sign in',
            usernameLabel: 'Username',
            usernamePlaceholder: 'Enter your username',
            passwordLabel: 'Password',
            passwordPlaceholder: 'Enter your password',
            submit: 'Sign in',
            signup: 'Sign up',
            forgot: 'Forgot password?',
            errors: {
              requiredUsername: 'Username is required',
              requiredPassword: 'Password is required',
              wrongCreds: 'Wrong credentials or unconfirmed user',
              server: 'Something went wrong. Please try again later or contact support'
            }
          },

          signup: {
            title: 'Sign up',
            firstNameLabel: 'First name',
            firstNamePlaceholder: 'Enter first name',
            lastNameLabel: 'Last name',
            lastNamePlaceholder: 'Enter last name',
            usernameLabel: 'Username',
            usernamePlaceholder: 'Enter username',
            emailLabel: 'Email',
            emailPlaceholder: 'Enter email',
            passwordLabel: 'Password',
            passwordPlaceholder: 'Enter password',
            confirmLabel: 'Confirm password',
            confirmPlaceholder: 'Confirm password',
            submit: 'Sign up',
            login: 'Sign in',
            errors: {
              requiredFirst: 'First name is required',
              requiredLast: 'Last name is required',
              requiredUsername: 'Username is required',
              requiredEmail: 'Email is required',
              invalidEmail: 'Enter a valid email',
              requiredPassword: 'Password is required',
              mismatch: 'Passwords do not match',
              userExists: 'User with this username already exists',
              emailExists: 'User with this email already exists',
              server: 'Something went wrong. Please try again later or contact support'
            }
          },

          forgot: {
            title: 'Forgot password?',
            label: 'Enter email or username',
            placeholder: 'email@example.com',
            back: 'BACK',
            submit: 'RESET PASSWORD',
            errors: {
              required: 'Please fill in this field',
              server: 'Something went wrong. Please try again later or contact support'
            }
          }
        },

        drawer: {
          contracts: 'Contracts',
          partneredContracts: 'Partnered Contracts',
          balanceHistory: 'History',
          deposit: 'Deposit Funds',
          withdraw: 'Withdraw Funds',
          referrals: 'Referral System',
          account: 'Account',
          home: 'Home',
          logout: 'Logout'
        },

        contractsTable: {
  contract: 'Contract',
  currentProfit: 'Current profit',
  duration: 'Days since start',
  deposit: 'Deposit',
  progress: 'Progress',
  creationDate: 'Creation date',
  noContracts: 'You have no contracts',

  reinvestProfit: 'Reinvest profit',
  reinvestTotal: 'Total profit',
  reinvestFinished: 'Completed reinvests',

  // modals
  modalReinvestTitle: 'Reinvestment',
  modalReinvestText: 'You are about to start reinvestment for contract',
  modalReinvestConfirm: 'Confirm',
  modalReinvestCancel: 'Cancel',

  modalStopTitle: 'Reinvestment enabled',
  modalStopText: 'To cancel reinvestment, please contact support',
  modalStopConfirm: 'Disable',

  modalSupportTitle: 'Reinvestment unavailable',
  modalSupportText: 'To start reinvestment for this contract, please contact support',
  modalOk: 'OK'
}

,

        partneredContractsPage: {
          title:               'Partnered contracts',
          newInvitations:      'New invitations',
          noNewInvitations:    'No new invitations.',
          createdContracts:    'Created partnered contracts',
          noCreatedContracts:  'No created contracts.',
          acceptedInvitations: 'Accepted invitations',
          noAcceptedInvitations:'No accepted invitations.',
          declinedInvitations: 'Declined invitations',
          noDeclinedInvitations:'No declined invitations.',
          newContractButton:   'Partnered contract',
          allContractsButton:  'All contracts'
        },

        balancePage: {
          title:     'Balance management',
          replenish: 'Replenish funds',
          withdraw:  'Withdraw funds'
        },

        cashflow: {
          headers: {
            type:            'Type',
            status:          'Status',
            amount:          'Amount',
            currentBalance:  'Current balance',
            date:            'Date',
            details:         'Details'
          },
          type: {
            replenish:        'Replenish balance',
            withdraw:         'Withdraw',
            dividend:         'Contract dividend',
            adminBonus:       'Admin bonus',
            contractOpen:     'Contract opened',
            contractClose:    'Contract closed',
            referralBonus:    'Referral bonus'
          },
          status: {
            pending:         'Pending',
            success:         'Success',
            declined:        'Declined'
          },
          noHistory:        'No transaction history',
          loadMore:         'Load more'
        },

        balanceStat: {
          currentBalance: 'Current balance'
        },

        replenishPage: {
          title:               'Replenish balance',
          back:                'Back',
          amountPlaceholder:   'Amount',
          replenish:           'Replenish',
          invalidFormat:       'Invalid amount format',
          pleaseReplenish:     'Please replenish your balance with ${{value}} to wallet {{wallet}}.',
          support:             'To use this method, please contact support.'
        },

        withdrawPage: {
          title:                   'Withdraw funds',
          back:                    'Back',
          noWallets:               'You have no wallets for withdrawal. Please add a wallet.',
          selectWalletPrompt:      'Select a wallet',
          amountPlaceholder:       'Enter amount',
          withdraw:                'Withdraw',
          addWallet:               'Add wallet',
          manageWallets:           'Manage wallets',
          enterWalletNumber:       'Enter credit card or crypto wallet number',
          selectWalletType:        'Select wallet type',
          walletTypes: {
            creditCard:            'Credit Card',
            trc20:                 'TRC20 USDT',
            bitcoin:               'Bitcoin',
            ethereum:              'Ethereum'
          },
          enterWalletPlaceholder:  'Enter wallet number',
          invalidWalletFormat:     'Invalid wallet number format',
          invalidWalletType:       'Invalid wallet type',
          walletAdded:             'Wallet added successfully. Please select it above.',
          withdrawalSubmitted:     'Your withdrawal request has been submitted. Please await admin approval.',
          serverError:             'Something went wrong. Please try again later or contact support.'
        },

        "referralsPage": {
    "title": "Referral system",
    "totalContracts": "Total contracts",
    "totalValue": "Total contracts value",
    "totalProfit": "Total profit",
    "firstLine": "First‑line income",
    "secondLine": "Second‑line income",
    "thirdLine": "Third‑line income",
    "username": "Username",
    "contractsCount": "Contracts count",
    "contractsValue": "Contracts value",
    "income": "Income",
    "line": "Line",
    "parentUsername": "Parent username",
    "empty": "You have no referral income yet. To become a partner of the platform and earn additional income from invited users, use your referral link"
  },
  "common": {
    "back": "Back"
  },

  "profilePage": {
    "title": "Profile",
    "verified": "Account verified!",
    "needVerification": "Contact support for identity verification",
    "temporaryRestrictions": "Temporary restrictions applied",
    "firstName": "First name",
    "lastName": "Last name",
    "email": "Email",
    "referralLink": "Referral link",
    "howItWorks": "How it works?",
    "myReferralSystem": "My referral system",
    "rewardsHeading": "Referral reward conditions:",
    "rewardsIntro": "When a new contract is opened via your referral link you receive:",
    "line1": "1. First line: 5% of the initial investment made by the partner registered with your link.",
    "line2": "2. Second line: 3% of the initial investment made by partners invited by your first‑line referrals.",
    "line3": "3. Third line: 2% of the initial investment made by partners invited by your second‑line referrals.",
    "individualHeading": "Individual conditions:",
    "individualText": "If you show high activity, we may offer special terms and bonuses as recognition of your contribution.",
    "support": "Contact support",
    "replenish": "Deposit",
    "withdraw": "Withdraw",
    "logout": "Log out"
  },

  "newContractsPage": {
    "title": "Add contract",
    "allContracts": "All contracts"
  },

  "manageContracts": {
    "title": "Contract management",
    "add": "Add contract",
    "partnered": "Partnered contracts"
  },

  "contractTable": {
    "name": "Name",
    "min": "Min deposit",
    "max": "Max deposit",
    "percent": "Percent",
    "term": "Term",
    "choose": "Choose",
    "selected": "Selected contract",
    "amountPlaceholder": "Deposit amount",
    "deposit": "Make deposit",
    "successAdded": "Contract added successfully",
    "estimatedProfit": "Estimated profit",
  "tooSmall": "The amount is below the minimum",
  "tooLarge": "The amount exceeds the maximum"
  },
  "commonEr": {
    "serverError": "Something went wrong. Please try again later or contact support"
  }, 

  "partneredTable": {
    "name": "Name",
    "min": "Min deposit",
    "max": "Max deposit",
    "percent": "Percent",
    "term": "Term",
    "maxPartners": "Max partners",
    "choose": "Choose",
    "selected": "Selected contract",
    "initialContribution": "Initial contribution amount",
    "amountPlaceholder": "Deposit amount",
    "partners": "Partners",
    "partnerPlaceholder": "Enter partner username",
    "add": "Add",
    "partnersEmpty": "Partner list is empty",
    "deposit": "Make deposit",
    "needFill": "Please fill partner list and enter an initial contribution",
    "successCreated": "Contract created successfully",
    "noContracts": "No contracts available for opening. Please contact support."
  },

  "partneredAdd": {
    "title":        "Create partnered contract",
    "partneredBtn": "Partnered contracts",
    "allBtn":       "All contracts"
  },

  commonContract: {
    inviteSuccess: 'User successfully invited.',
    serverError: 'Something went wrong. Please try again later or contact support.',
    enterAmount: 'Please enter contribution amount.',
    active: 'Active',
    created: 'Created',
    ends: 'Ends',
    creator: 'Contract creator',
    accept: 'Accept',
    decline: 'Decline',
    confirmDecline: 'Are you sure?',
    back: 'Back',
    enterContribution: 'Enter contribution amount for partner contract.',
    amountPlaceholder: 'Contribution amount',
    yourContribution: 'Your contribution',
    plannedIncome: 'Planned income',
    addUser: 'Add user',
    usernamePlaceholder: 'Username'
  },

  registrationConfirmation: {
  "title": "Registration Confirmation",
  "instruction": "Please confirm your registration by going to Telegram.",
  "linkText": "Go to the link",
  "afterConfirmation": "After confirming your registration, you can log into your account."
}


  
        
        
      }
    },
    // -------------------------------------------------------------------------------------END OF SECTION IS HERE----------------------------
    // -------------------------------------------------------------------------------------END OF SECTION IS HERE----------------------------
    // -------------------------------------------------------------------------------------END OF SECTION IS HERE----------------------------
    // -------------------------------------------------------------------------------------END OF SECTION IS HERE----------------------------
    // -------------------------------------------------------------------------------------END OF SECTION IS HERE----------------------------

    ru: {
      translation: {
        // ----- Общие переводы
        home: 'Главная',
        future: 'Перспективы',
        about: 'О Нас',
        qa: 'Q & A',
        stats: 'Статистика',
        login: 'Войти',
        signup: 'Зарегистрироваться',
        profile: 'Профиль',

        // ----- hero
        hero: {
          title: {
            line1: 'Distributed',
            line2: 'Efficient Shipping'
          },
          subtitle: 'Умножаем скорость, создаем ценность.',
          button: {
            start: 'Начать сейчас',
            profile: 'Перейти в профиль'
          }
        },

        // ----- partners
        partners: {
          title: 'Наши партнёры по всему миру',
          subtitle: 'Мы работаем с городами и странами, обеспечивая логистику мирового уровня.'
        },

        // ----- cities
        cities: {
          moscow: 'Москва',
          newyork: 'Нью-Йорк',
          tokyo: 'Токио',
          london: 'Лондон',
          berlin: 'Берлин',
          sydney: 'Сидней',
          dubai: 'Дубай',
          paris: 'Париж'
        },

        // ----- futureSection
        futureSection: {
          title: 'Инвестируйте в логистику — будущее начинается сегодня!',
          button: {
            show: 'Узнать больше',
            hide: 'Скрыть детали'
          },
          details: {
            title: 'Почему логистика — это будущее?',
            description:
              'Логистика — это основа глобальной торговли и экономики. С древних времен, начиная с торговых маршрутов Шелкового пути и заканчивая современными контейнерными перевозками, логистика позволяла связывать рынки и ускорять экономический рост.',
            history: {
              title: 'Историческая устойчивость',
              description:
                'С момента создания первых торговых караванов и морских путей логистика постоянно развивалась. Промышленная революция дала толчок железнодорожным и морским перевозкам, а в XX веке появились авиационные и контейнерные перевозки, изменившие мир навсегда. Сегодня логистика остается устойчивой отраслью, на которую влияет лишь технологический прогресс.'
            },
            stability: {
              title: 'Безопасность и перспективы',
              description:
                'Инвестиции в логистику считаются одними из самых стабильных. Даже в кризисные времена товары должны передвигаться, а технологии делают процесс более безопасным и предсказуемым.'
            },
            ai: {
              title: 'Влияние ИИ на логистику',
              description:
                'Искусственный интеллект меняет правила игры в логистике. Алгоритмы машинного обучения позволяют прогнозировать спрос, оптимизировать маршруты, сокращать издержки и улучшать доставку. Беспилотные автомобили и дроны скоро станут стандартом в логистике, а умные склады значительно повысят эффективность хранения и отправки товаров.'
            }
          }
        },

        // ----- investments
        investments: {
          title: 'Инвестиции в логистику',
          description1:
            'Логистика играет важнейшую роль в мировой экономике. Развивайте складские мощности, транспортную инфраструктуру и экологические технологии, чтобы достичь успеха.',
          description2:
            'Узнайте больше о различных направлениях инвестирования в логистику: складские системы, электротранспорт, морские и воздушные перевозки.',
          carouselLabel: 'Инвестиции в логистику',
          shortDescriptions: {
            plane: '10-20 млрд $ в год',
            truck: '50-70 млрд $ в год',
            cargo: '50-60 млрд $ в год',
            internet: '150-170 млрд $ в год',
            train: '90-95 млрд $ в год',
            papers: '5-7 млрд $ в год'
          },
          icons: {
            cargoIcon: 'Иконка грузоперевозок',
            truckIcon: 'Иконка грузовика',
            internetIcon: 'Иконка интернета',
            trainIcon: 'Иконка поезда',
            planeIcon: 'Иконка самолета',
            papersIcon: 'Иконка документов'
          },
          titles: {
            seaTransport: 'Морские перевозки',
            landTransport: 'Сухопутный транспорт',
            digitalization: 'Цифровизация',
            electricTransport: 'Электротранспорт',
            airTransport: 'Авиаперевозки',
            optimization: 'Оптимизация'
          },
          descriptions: {
            seaTransportDesc: 'Модернизация портов и судоходства.',
            landTransportDesc: 'Передвижение товаров грузовиками.',
            digitalizationDesc: 'Разработка логистических IT-решений.',
            electricTransportDesc: 'Инвестиции в электрогрузовики и экологичный транспорт.',
            airTransportDesc: 'Передвижение товаров воздушными судами.',
            optimizationDesc: 'Развитие и настройка логистической экономики.'
          }
        },

        // ----- investmentPercent
        investmentPercent: {
          title: 'Калькулятор роста инвестиций',
          button: {
            show: 'Показать детали',
            hide: 'Скрыть детали'
          },
          details: {
            title: 'Почему инвестировать сейчас?',
            description: 'Текст о деталях инвестиций...',
            history: {
              title: 'История инвестиций',
              description: 'Немного исторической справки...'
            },
            stability: {
              title: 'Стабильность и доходность',
              description: 'Почему это стабильно...'
            },
            ai: {
              title: 'ИИ в инвестициях',
              description: 'Как ИИ помогает в инвестировании...'
            }
          }
        },

        // ----- possibilities (НОВАЯ СЕКЦИЯ)
        possibilities: {
          title: 'Откройте мир инвестиций',
          description: 'Присоединяйтесь к тысячам успешных инвесторов и увеличивайте свои активы.',
          stats: {
            investors: 'Инвесторов',
            assets: 'Управляемых активов',
            projects: 'Проектов'
          }
        },

        whatWeDo: {
          title: 'Наш вклад в приумножение капиталов',
          description: 'Мы предоставляем комплексные решения для транспортной, складской и цифровой логистики, помогая бизнесу расти и развиваться. Наша команда экспертов специализируется на оптимизации всех этапов логистических процессов, начиная от планирования маршрутов и управления транспортными потоками до автоматизации складских операций и внедрения передовых IT-решений. Мы понимаем, что успех современного бизнеса напрямую зависит от эффективности логистики, поэтому предлагаем индивидуальный подход к каждому клиенту, учитывая его уникальные потребности и задачи.',
          cards: {
            modernization: {
              title: 'Модернизация',
              description: 'Наша компания ревизирует и имплементирует новые решения в существующие логистические цепи.'
            },
            creation: {
              title: 'Создание',
              description: 'Мы предлагаем комплекс решений для развития новых логистических компаний *под ключ*.'
            },
            digitalization: {
              title: 'Цифровизация',
              description: 'Разработка IT-решений для логистической отрасли. Мы внедряем системы управления цепями поставок и аналитические платформы.'
            }
          }
        },

        infoBlock: {
          title: 'Информация о логистике',
          paragraphs: {
            transport: 'Транспорт – вложения в покупку и обновление автопарка, ж/д вагонов, судов и авиафлота. Это повышает скорость, надёжность и гибкость поставок, снижая затраты на перевозки.',
            warehouse: 'Складская инфраструктура – строительство и модернизация складов, терминалов и распределительных центров. Оптимизация складской сети позволяет ускорить обработку грузов и снизить издержки хранения.',
            automation: 'Автоматизация – инвестиции в цифровые технологии, роботизацию, WMS-системы и искусственный интеллект. Они повышают эффективность логистических процессов, сокращают ошибки и ускоряют выполнение заказов.'
          },
          boxes: {
            box1: 'Склад',
            box2: 'Автоматизация',
            box3: 'Транспорт'
          }
        },

        faq: {
          "0": {
            question: "Логистика – это безопасно?",
            answer: 
              "Современная логистика опирается на комплекс мер, обеспечивающих безопасность на каждом этапе перевозки.\n\n" +
              "GPS-мониторинг: Отслеживание транспорта в реальном времени позволяет контролировать маршрут, исключать отклонения и быстро реагировать на ЧП.\n" + 
              "Системы видеонаблюдения: Внутренние и внешние камеры в грузовиках позволяют контролировать погрузку и разгрузку.\n" +
              "Страхование грузов: Ведущие компании страхуют грузы, покрывая риски повреждений, краж и форс-мажоров.\n" + 
              "Системы контроля водителей: Контроль усталости водителей (DMS-системы) предотвращает аварии. Например, система Wialon фиксирует резкие торможения, перестроения и нарушения режима труда и отдыха.\n" + 
              "Пример: Крупнейший логистический оператор DHL использует систему Resilience360 для мониторинга рисков на маршрутах по всему миру."
          },
          "1": {
            question: "Какие технологии используются в современной логистике?",
            answer:
              "Логистика сегодня – это высокотехнологичная сфера. Основные решения:\n\n" +
              "TMS (Transport Management System): Автоматизация планирования маршрутов, учета расходов и отслеживания груза.\n" +
              "IoT-датчики: Температурные датчики, датчики влажности и вибрации обеспечивают контроль условий перевозки, особенно в фармацевтике и пищевой отрасли.\n" +
              "Big Data и аналитика: Анализ больших данных помогает прогнозировать задержки, оптимизировать маршруты и выявлять узкие места.\n" +
              "Системы управления складом (WMS): Роботизированные склады ускоряют комплектацию заказов и снижают человеческий фактор.\n" +
              "Блокчейн: Прозрачная и защищённая цепочка поставок, где каждый участник видит этапы перемещения груза.\n" +
              "Пример: Amazon активно внедряет роботизацию складов и использует дроны для доставки."
          },
          "2": {
            question: "Что такое цепочка поставок, и почему она важна?",
            answer:
              "Цепочка поставок (supply chain) – это комплекс всех процессов, начиная от производства товаров до их доставки конечному потребителю.\n\n" +
              "Включает:\n" + 
              "Закупка сырья → Производство → Хранение → Транспортировка → Распределение → Розничная продажа.\n" +
              "Слаженность этой цепочки критически важна, ведь сбой на любом участке ведет к задержкам, потерям и убыткам.\n" +
              "Пример: В 2021 году глобальный кризис цепочек поставок из-за COVID-19 привел к росту цен на контейнерные перевозки в 10 раз и задержкам товаров по всему миру. Компании, использующие автоматизацию и диверсификацию поставщиков (например, Zara), быстрее адаптировались."
          },
          "3": {
            question: "Какие риски есть в логистике, и как с ними борются?",
            answer:
              "Основные риски:\n\n" +
              "Задержки: Погодные условия, пробки, поломки транспорта.\n" +
              "→ Решение: Резервные маршруты, прогнозирование с помощью AI.\n" +
              "Кражи: Особенно ценные грузы.\n" +
              "→ Решение: Сигнализация, спутниковая охрана, пломбы с датчиками вскрытия.\n" +
              "Порча товара: Нарушение условий хранения.\n" +
              "→ Решение: Холодовые цепочки, IoT-контроль температуры.\n" +
              "Человеческий фактор: Ошибки при погрузке, усталость водителей.\n" +
              "→ Решение: Автоматизация, контроль режима труда, обучение.\n" +
              "Пример: Nestlé использует цифровые платформы для мониторинга поставок и контроля качества продукции в реальном времени."
          },
          "4": {
            question: "Как логистическая компания зарабатывает, и как распределяются доходы?",
            answer:
              "Источники дохода:\n\n" +
              "Тарифы за перевозку грузов.\n" +
              "Хранение и складские услуги.\n" +
              "Дополнительные сервисы (страхование, экспедирование).\n" +
              "Оптимизация маршрутов и снижение затрат.\n" +
              "Рентабельность зависит от загрузки транспорта, оптимизации процессов и внедрения технологий.\n" +
              "Пример: Российская компания «Деловые Линии» внедрила собственную TMS-систему, что позволило сократить холостые рейсы и повысить доходность."
          },
          "5": {
            question: "Какие экологические тренды в логистике?",
            answer:
              "Электрогрузовики: Tesla Semi, Volvo Electric Trucks.\n" +
              "Оптимизация маршрутов: Сокращение пробега – меньше выбросов.\n" +
              "Эко-погрузчики: Электропогрузчики на складах.\n" +
              "Карго-дроны: Перспектива для быстрой доставки с низким углеродным следом.\n" +
              "Пример: Maersk инвестирует в суда на экологичном топливе (метаноле), снижая выбросы CO2 на 70%."
          },
          "6": {
            question: "Как быстро растет логистический рынок?",
            answer:
              "Глобальный рынок логистики оценивается в $9,6 трлн (2023), и прогнозируется рост на 6-8% ежегодно. Особенно активно развиваются направления:\n\n" +
              "E-commerce (Wildberries, Ozon).\n" +
              "Холодовые цепочки (перевозка продуктов, вакцин).\n" +
              "Логистика «последней мили» (доставка до двери).\n" +
              "Пример: В России СДЭК за 5 лет увеличил сеть с 1000 до 4500 пунктов выдачи."
          },
          "7": {
            question: "Почему инвестировать в логистику перспективно?",
            answer:
              "Постоянный рост грузооборота.\n" +
              "Цифровизация снижает расходы и повышает прозрачность.\n" +
              "Высокая маржинальность складской логистики.\n" +
              "Стабильность спроса – товары всегда нужно перевозить.\n" +
              "Пример: IPO китайской логистической компании ZTO Express в 2016 году принесло $1,4 млрд, что стало крупнейшим размещением транспортной компании на NYSE."
          }
        },

        investmentInfo: {
          title: 'Информация о логистике',
          paragraphs: {
            p1: 'Глобальная логистическая отрасль демонстрирует значительный рост и привлекает существенные инвестиции. В 2021 году объём инвестиций в логистические стартапы достиг рекордных 24,6 миллиарда долларов США, что почти вдвое превышает показатель 2020 года (12,6 миллиарда долларов США). Этот рост обусловлен повышенным вниманием к цепочкам поставок и необходимости их модернизации в условиях пандемии COVID-19. (TRANS.INFO)',
            p2: 'В первой половине 2022 года инвестиции в логистическую инфраструктуру составили около 34 миллиардов долларов США, что на 13% больше по сравнению с аналогичным периодом предыдущего года. Основным драйвером этого роста является развитие электронной коммерции, объём которой в 2021 году увеличился на 13,3% и достиг примерно 88,1 миллиарда евро. (MORDOR INTELLIGENCE)',
            p3: 'В целом, несмотря на текущие экономические и геополитические вызовы, логистическая отрасль продолжает привлекать значительные инвестиции, отражая её ключевую роль в обеспечении эффективных цепочек поставок и удовлетворении растущих потребностей мировой экономики. (PWC)',
          },
          boxes: {
            b1: 'TRANS.INFO',
            b2: 'M.INT',
            b3: 'PWC'
          },
          chartTitle: 'Chart of Investments in Logistics Startups'
        },

        futureProjects: {
          title: 'Логистические перспективы',
          paragraph: 'Прогнозы указывают на дальнейший рост мирового рынка логистических услуг, который к 2026 году может достигнуть 100 миллиардов евро, во многом благодаря быстрому развитию электронной торговли. (FINAM)',
          sectors: [
            { name: 'Складские системы' },
            { name: 'Транспортная инфраструктура' },
            { name: 'Цифровизация' },
            { name: 'Экологичный транспорт' },
            { name: 'Морская логистика' }
          ]
        },

        investText: {
          title: 'Инвестиции в логистику',
          paragraphs: {
            p1: 'Логистика — это основа мировой экономики. Развитие складских систем, внедрение цифровых технологий и улучшение транспортной инфраструктуры позволяют компаниям оптимизировать затраты и повысить эффективность.',
            p2: 'С ростом спроса на экологичные технологии инвестиции в электрический транспорт и снижение углеродного следа становятся приоритетом. Поддержка этих направлений помогает сохранить природу и улучшить качество жизни.',
            p3: 'Выбирая логистику как сферу для инвестиций, вы вкладываете в будущее глобальной экономики.'
          }
        },

        footer: {
          copyright: '© 2023 Distributed Efficient Shipping LTD - ВСЕ ПРАВА ЗАЩИЩЕНЫ',
          support: 'Электронная почта поддержки: support-contact@des.com',
          terms: 'Правила пользования',
          certificate: 'Сертификат'
        },
        auth: {
          signin: {
            title: 'Войти',
            usernameLabel: 'Имя пользователя',
            usernamePlaceholder: 'Введите имя пользователя',
            passwordLabel: 'Пароль',
            passwordPlaceholder: 'Введите пароль',
            submit: 'Войти',
            signup: 'Зарегистрироваться',
            forgot: 'Забыли пароль?',
            errors: {
              requiredUsername: 'Заполните имя пользователя',
              requiredPassword: 'Введите пароль',
              wrongCreds: 'Неверные данные или неподтверждённый пользователь',
              server: 'Произошла ошибка. Попробуйте позже или обратитесь в поддержку'
            }
          },

          signup: {
            title: 'Регистрация',
            firstNameLabel: 'Имя',
            firstNamePlaceholder: 'Введите имя',
            lastNameLabel: 'Фамилия',
            lastNamePlaceholder: 'Введите фамилию',
            usernameLabel: 'Имя пользователя',
            usernamePlaceholder: 'Введите имя пользователя',
            emailLabel: 'Электронная почта',
            emailPlaceholder: 'Введите электронную почту',
            passwordLabel: 'Пароль',
            passwordPlaceholder: 'Введите пароль',
            confirmLabel: 'Подтверждение пароля',
            confirmPlaceholder: 'Подтвердите пароль',
            submit: 'Зарегистрироваться',
            login: 'Войти',
            errors: {
              requiredFirst: 'Введите имя',
              requiredLast: 'Введите фамилию',
              requiredUsername: 'Введите имя пользователя',
              requiredEmail: 'Заполните электронную почту',
              invalidEmail: 'Введите корректную электронную почту',
              requiredPassword: 'Введите пароль',
              mismatch: 'Пароли не совпадают',
              userExists: 'Пользователь с таким именем уже существует',
              emailExists: 'Пользователь с таким емейлом уже существует',
              server: 'Произошла ошибка. Попробуйте позже или обратитесь в поддержку'
            }
          },

          forgot: {
            title: 'Забыли пароль?',
            label: 'Введите почту или логин',
            placeholder: 'email@example.com',
            back: 'НАЗАД',
            submit: 'СБРОСИТЬ ПАРОЛЬ',
            errors: {
              required: 'Заполните поле',
              server: 'Произошла ошибка. Попробуйте позже или обратитесь в поддержку'
            }
          }
        },

        drawer: {
          contracts: 'Контракты',
          partneredContracts: 'Партнерские контракты',
          balanceHistory: 'История',
          deposit: 'Внести средства',
          withdraw: 'Вывести средства',
          referrals: 'Реферальная система',
          account: 'Профиль',
          home: 'Главная',
          logout: 'Выход'
        },

        contractsTable: {
  contract: 'Контракт',
  currentProfit: 'Текущий профит',
  duration: 'Дней с начала',
  deposit: 'Депозит',
  progress: 'Прогресс',
  creationDate: 'Создан',
  noContracts: 'У вас нет контрактов',

  reinvestProfit: 'Доход от реинвеста',
  reinvestTotal: 'Общий профит',
  reinvestFinished: 'Завершено реинвестов',

  // модалки
  modalReinvestTitle: 'Реинвестиция',
  modalReinvestText: 'Вы собираетесь запустить реинвестирование для контракта',
  modalReinvestConfirm: 'Подтвердить',
  modalReinvestCancel: 'Отмена',

  modalStopTitle: 'Реинвестиция активна',
  modalStopText: 'Для отмены реинвестирования обратитесь в службу поддержки',
  modalStopConfirm: 'Отключить',

  modalSupportTitle: 'Реинвестиция недоступна',
  modalSupportText: 'Для запуска реинвестирования по контракту обратитесь в поддержку',
  modalOk: 'ОК'
}

,

        partneredContractsPage: {
          title:               'Партнерские контракты',
          newInvitations:      'Новые приглашения',
          noNewInvitations:    'Нет новых приглашений.',
          createdContracts:    'Созданные партнерские контракты',
          noCreatedContracts:  'Нет созданных контрактов.',
          acceptedInvitations: 'Принятые приглашения',
          noAcceptedInvitations:'Нет принятых приглашений.',
          declinedInvitations: 'Отклоненные приглашения',
          noDeclinedInvitations:'Нет отклоненных приглашений.',
          newContractButton:   'Партнерский контракт',
          allContractsButton:  'Все контракты'
        },

        balancePage: {
          title:     'Управление балансом',
          replenish: 'Внести средства',
          withdraw:  'Вывести средства'
        },

        cashflow: {
          headers: {
            type:            'Тип',
            status:          'Статус',
            amount:          'Начисление',
            currentBalance:  'Текущий баланс',
            date:            'Дата',
            details:         'Дополнительно'
          },
          type: {
            replenish:        'Пополнение баланса',
            withdraw:         'Вывод со счета',
            dividend:         'Процент от контракта',
            adminBonus:       'Бонус от администрации',
            contractOpen:     'Открытие контракта',
            contractClose:    'Закрытие контракта',
            referralBonus:    'Реферальный бонус'
          },
          status: {
            pending:         'На рассмотрении',
            success:         'Успех',
            declined:        'Отклонено'
          },
          noHistory:        'Нет истории операций',
          loadMore:         'Загрузить больше'
        },

        balanceStat: {
          currentBalance: 'Текущий баланс'
        },

        replenishPage: {
          title:               'Пополнить баланс',
          back:                'Назад',
          amountPlaceholder:   'Сумма',
          replenish:           'Пополнить',
          invalidFormat:       'Неверный формат суммы',
          pleaseReplenish:     'Пожалуйста, пополните баланс на сумму ${{value}} на кошелек {{wallet}}.',
          support:             'Для пополнения данным способом, пожалуйста, обратитесь в службу поддержки.'
        },

        withdrawPage: {
          title:                   'Вывести средства',
          back:                    'Назад',
          noWallets:               'У вас нет кошельков для вывода средств. Пожалуйста, добавьте кошелек.',
          selectWalletPrompt:      'Выберите кошелек',
          amountPlaceholder:       'Введите сумму',
          withdraw:                'Вывести',
          addWallet:               'Добавить кошелек',
          manageWallets:           'Управление кошельками',
          enterWalletNumber:       'Введите номер кредитной карты или криптокошелька',
          selectWalletType:        'Выберите тип кошелька',
          walletTypes: {
            creditCard:            'Кредитная карта',
            trc20:                 'TRC20 USDT',
            bitcoin:               'Bitcoin',
            ethereum:              'Ethereum'
          },
          enterWalletPlaceholder:  'Введите номер кошелька',
          invalidWalletFormat:     'Неверный формат номера кошелька',
          invalidWalletType:       'Неверный тип кошелька',
          walletAdded:             'Кошелек успешно добавлен. Пожалуйста, выберите его в списке выше',
          withdrawalSubmitted:     'Ваша заявка на вывод средств успешно отправлена. Пожалуйста, ожидайте ответа от администрации',
          serverError:             'Произошла ошибка. Попробуйте позже или обратитесь в поддержку'
        },

        "referralsPage": {
    "title": "Реферальная система",
    "totalContracts": "Всего контрактов",
    "totalValue": "Общая сумма контрактов",
    "totalProfit": "Общий доход",
    "firstLine": "Доход первой линии",
    "secondLine": "Доход второй линии",
    "thirdLine": "Доход третьей линии",
    "username": "Имя пользователя",
    "contractsCount": "Кол-во контрактов",
    "contractsValue": "Сумма контрактов",
    "income": "Доход",
    "line": "Линия",
    "parentUsername": "Родительское имя пользователя",
    "empty": "У вас на данный момент отсутствует реферальный доход. Чтобы стать партнёром платформы и получать дополнительный доход от привлечения партнёров, воспользуйтесь реферальной ссылкой"
  },
  "common": {
    "back": "Назад"
  },

  "profilePage": {
    "title": "Профиль",
    "verified": "Аккаунт верифицирован!",
    "needVerification": "Обратитесь в поддержку для верификации личности",
    "temporaryRestrictions": "Наложены временные ограничения",
    "firstName": "Имя",
    "lastName": "Фамилия",
    "email": "Электронная почта",
    "referralLink": "Реферальная ссылка",
    "howItWorks": "Как это работает?",
    "myReferralSystem": "Моя реферальная система",
    "rewardsHeading": "Условия реферальных наград:",
    "rewardsIntro": "При открытии нового контракта по вашей ссылке вы получаете:",
    "line1": "1. Первая линия: 5% от первоначального вложения партнёра, зарегистрированного по вашей ссылке.",
    "line2": "2. Вторая линия: 3% от первоначального вложения партнёров, приглашённых вашей первой линией.",
    "line3": "3. Третья линия: 2% от первоначального вложения партнёров, приглашённых вашей второй линией.",
    "individualHeading": "Индивидуальные условия:",
    "individualText": "При высокой активности мы можем предложить вам индивидуальные условия и бонусы как признание вашего вклада.",
    "support": "Обратиться в поддержку",
    "replenish": "Внести средства",
    "withdraw": "Вывести средства",
    "logout": "Выйти из аккаунта"
  },

  
        "newContractsPage": {
    "title": "Добавить контракт",
    "allContracts": "Все контракты"
  },

  "manageContracts": {
    "title": "Управление контрактами",
    "add": "Добавить контракт",
    "partnered": "Партнерские контракты"
  },

  "contractTable": {
    "name": "Название",
    "min": "Мин. взнос",
    "max": "Макс. взнос",
    "percent": "Процент",
    "term": "Срок",
    "choose": "Выбрать",
    "selected": "Выбранный контракт",
    "amountPlaceholder": "Сумма взноса",
    "deposit": "Внести взнос",
    "successAdded": "Контракт успешно добавлен",
    "estimatedProfit": "Ожидаемый доход",
    "tooSmall": "Сумма меньше допустимой",
"tooLarge": "Сумма превышает лимит"

  },
  "commonEr": {
    "serverError": "Произошла ошибка. Попробуйте позже или обратитесь в поддержку"
  },

  "partneredTable": {
    "name": "Название",
    "min": "Мин. взнос",
    "max": "Макс. взнос",
    "percent": "Процент",
    "term": "Срок",
    "maxPartners": "Макс. кол-во партнёров",
    "choose": "Выбрать",
    "selected": "Выбранный контракт",
    "initialContribution": "Изначальная сумма взноса",
    "amountPlaceholder": "Сумма взноса",
    "partners": "Партнеры",
    "partnerPlaceholder": "Введите ник партнера",
    "add": "Добавить",
    "partnersEmpty": "Список партнеров пуст",
    "deposit": "Внести взнос",
    "needFill": "Пожалуйста, заполните список партнёров и укажите изначальный взнос",
    "successCreated": "Контракт успешно создан",
    "noContracts": "У вас нет доступных контрактов для открытия. Обратитесь в службу поддержки."
  },

  "partneredAdd": {
    "title":        "Создать партнерский контракт",
    "partneredBtn": "Партнерские контракты",
    "allBtn":       "Все контракты"
  },

  commonContract: {
    inviteSuccess: 'Пользователь успешно приглашён.',
    serverError: 'Произошла ошибка. Попробуйте позже или обратитесь в поддержку',
    enterAmount: 'Введите сумму взноса.',
    active: 'Активен',
    created: 'Создан',
    ends: 'Оканчивается',
    creator: 'Создатель контракта',
    accept: 'Принять',
    decline: 'Отклонить',
    confirmDecline: 'Вы уверены?',
    back: 'Назад',
    enterContribution: 'Укажите сумму взноса в партнерский контракт.',
    amountPlaceholder: 'Сумма взноса',
    yourContribution: 'Ваш взнос',
    plannedIncome: 'Планируемый доход',
    addUser: 'Добавить пользователя',
    usernamePlaceholder: 'Имя пользователя'
  },

  registrationConfirmation: {
    "title": "Подтверждение регистрации",
    "instruction": "Подтвердите регистрацию, перейдя в телеграм.",
    "linkText": "Перейти по ссылке",
    "afterConfirmation": "После подтверждения регистрации, вы можете войти в свой аккаунт."
  }
        
      }
    }
  }
});
if (typeof window !== 'undefined') {
  i18next.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
  });
}
export default i18next;
