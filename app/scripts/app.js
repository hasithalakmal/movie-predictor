'use strict';

/**
 * @ngdoc home
 * @name dashyAngular
 * @description
 * # dashyAngular
 *
 * Main module of the application.
 */
window.app_version = 6;

angular
    .module('dashyAngular', [
        'ui.router',
        'ngAnimate',
        'ui.bootstrap',
        'textAngular',
        'ui.calendar',
        'perfect_scrollbar',
        'angular-loading-bar',
        'chart.js',
        'angular-growl',
        'angulartics',
        'angulartics.google.analytics',
        'gridshore.c3js.chart',
        'growlNotifications',
        'xeditable',
        'ngSanitize',
        'angular-bind-html-compile',
        'datatables',
        'ngValidate',
        'ng-sweet-alert',
        'ngAudio',
        'angular-js-xlsx'


    ])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.latencyThreshold = 5;
        cfpLoadingBarProvider.includeSpinner = false;
    }])

    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('plain', {
                abstract: true,
                url: '',
                templateUrl: 'views/layouts/plain.html?v=' + window.app_version,
            })
            .state('boxed', {
                abstract: true,
                url: '',
                parent: 'plain',
                templateUrl: 'views/layouts/boxed.html?v=' + window.app_version,
            })

            .state('login', {
                url: '/login',
                parent: 'boxed',
                templateUrl: 'views/pages/login.html?v=' + window.app_version,
                controller: 'LoginCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                parent: 'plain',
                templateUrl: 'views/layouts/dashboard.html?v=' + window.app_version,
                controller: 'DashboardCtrl'
            })
            .state('home', {
                url: '/home',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/home.html?v=' + window.app_version,
            })
            .state('reports', {
                url: '/reports',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/reports.html?v=' + window.app_version,
            })
            .state('accordion', {
                url: '/ui-elements/accordion',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/accordion.html?v=' + window.app_version,
                controller: 'AccordionDemoCtrl'
            })
            .state('alert', {
                url: '/ui-elements/alert',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/alert.html?v=' + window.app_version,
                controller: 'AlertDemoCtrl'
            })
            .state('collapse', {
                url: '/ui-elements/collapse',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/collapse.html?v=' + window.app_version,
                controller: 'CollapseDemoCtrl'
            })
            .state('datepicker', {
                url: '/ui-elements/datepicker',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/datepicker.html?v=' + window.app_version,
                controller: 'DatepickerDemoCtrl'
            })
            .state('dropdown', {
                url: '/ui-elements/dropdown',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/dropdown.html?v=' + window.app_version,
                controller: 'DropdownCtrl'
            })
            .state('other-elements', {
                url: '/ui-elements/other-elements',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/other-elements.html?v=' + window.app_version,
            })
            .state('modal', {
                url: '/ui-elements/modal',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/modal.html?v=' + window.app_version,
                controller: 'ModalDemoCtrl'
            })
            .state('pagination', {
                url: '/ui-elements/pagination',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/pagination.html?v=' + window.app_version,
                controller: 'PaginationDemoCtrl'
            })
            .state('popover', {
                url: '/ui-elements/popover',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/popover.html?v=' + window.app_version,
                controller: 'PopoverDemoCtrl'
            })
            .state('progressbars', {
                url: '/ui-elements/progressbars',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/progressbar.html?v=' + window.app_version,
                controller: 'ProgressDemoCtrl'
            })
            .state('tabs', {
                url: '/ui-elements/tabs',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/tabs.html?v=' + window.app_version,
                controller: 'TabsDemoCtrl'
            })
            .state('panel', {
                url: '/panel',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/panel.html?v=' + window.app_version,
            })
            .state('table', {
                url: '/table',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/table.html?v=' + window.app_version,
            })
            .state('profile', {
                url: '/profile',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/profile.html?v=' + window.app_version,
            })
            .state('grid', {
                url: '/grid',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/grid.html?v=' + window.app_version,
            })
            .state('elements', {
                url: '/form/elements',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/forms/elements.html?v=' + window.app_version,
            })
            .state('components', {
                url: '/form/components',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/forms/components.html?v=' + window.app_version,
            })
            .state('invoice', {
                url: '/invoice',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/invoice.html?v=' + window.app_version,
            })
            .state('inbox', {
                url: '/mail/inbox',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/mail/inbox.html?v=' + window.app_version,
            })
            .state('typography', {
                url: '/ui-elements/typography',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/typography.html?v=' + window.app_version,
            })
            .state('icons', {
                url: '/ui-elements/icons',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/icons.html?v=' + window.app_version,
            })
            .state('compose', {
                url: '/mail/compose',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/mail/compose.html?v=' + window.app_version,
            })
            .state('blank', {
                url: '/blank',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/database/blank.html?v=' + window.app_version,

            })


            .state('update', {
                url: '/update',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/database/update.html?v=' + window.app_version,

            })


            .state('calendar', {
                url: '/calendar',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/calendar.html?v=' + window.app_version,


            })
            .state('docs', {
                url: '/docs',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/docs.html?v=' + window.app_version,

            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/pages/signup.html?v=' + window.app_version,
                parent: 'boxed',
                controller: 'LoginCtrl'
            })
            .state('forgot-password', {
                url: '/forgot-password',
                parent: 'boxed',
                templateUrl: 'views/pages/forgot-password.html?v=' + window.app_version,
                controller: 'LoginCtrl'
            })
            .state('404-page', {
                url: '/404-page',
                parent: 'boxed',
                templateUrl: 'views/pages/404-page.html?v=' + window.app_version,
                controller: 'LoginCtrl'
            })
            .state('timepicker', {
                url: '/ui-elements/timepicker',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/timepicker.html?v=' + window.app_version,
                controller: 'TimepickerDemoCtrl'
            })
            .state('button', {
                url: '/ui-elements/button',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/button.html?v=' + window.app_version,
                controller: 'ButtonsCtrl'
            })


            .state('Create_Database', {
                url: '/codemage/Database_Manager/Create_Database',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Database_Manager/Create_Database.html?v=' + window.app_version,
                controller: 'Create_Database'
            })
            .state('View_Databases', {
                url: '/codemage/Database_Manager/View_Databases',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Database_Manager/View_Databases.html?v=' + window.app_version,
                controller: 'View_Databases'
            })
            .state('Drop_Database', {
                url: '/codemage/Database_Manager/Drop_Database',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Database_Manager/Drop_Database.html?v=' + window.app_version,
                controller: 'Drop_Database'
            })

            .state('Delete_Data', {
                url: '/codemage/Data_Manager/Delete_Data',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Data_Manager/Delete_Data.html?v=' + window.app_version,
                controller: 'Delete_Data'
            })

            .state('Insert_Data', {
                url: '/codemage/Data_Manager/Insert_Data',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Data_Manager/Insert_Data.html?v=' + window.app_version,
                controller: 'Insert_Data'
            })
            .state('Update_Data', {
                url: '/codemage/Data_Manager/Update_Data',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Data_Manager/Update_Data.html?v=' + window.app_version,
                controller: 'Update_Data'
            })
            .state('View_Data', {
                url: '/codemage/Data_Manager/View_Data',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Data_Manager/View_Data.html?v=' + window.app_version,
                controller: 'View_Data'
            })

            .state('Alter_Table', {
                url: '/codemage/Table_Manager/Alter_Table',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Table_Manager/Alter_Table.html?v=' + window.app_version,
                controller: 'Alter_Table'
            })
            .state('Create_Table', {
                url: '/codemage/Table_Manager/Create_Table',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Table_Manager/Create_Table.html?v=' + window.app_version,
                controller: 'Create_Table'
            })
            .state('Drop_Links', {
                url: '/codemage/Table_Manager/Drop_Links',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Table_Manager/Drop_Links.html?v=' + window.app_version,
                controller: 'Drop_Links'
            })
            .state('Drop_Table', {
                url: '/codemage/Table_Manager/Drop_Table',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Table_Manager/Drop_Table.html?v=' + window.app_version,
                controller: 'Drop_Table'
            })
            .state('Link_Tables', {
                url: '/codemage/Table_Manager/Link_Tables',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Table_Manager/Link_Tables.html?v=' + window.app_version,
                controller: 'Link_Tables'
            })
            .state('View_Links', {
                url: '/codemage/Table_Manager/View_Links',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Table_Manager/View_Links.html?v=' + window.app_version,
                controller: 'View_Links'
            })
            .state('View_Tables', {
                url: '/codemage/Table_Manager/View_Tables',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Table_Manager/View_Tables.html?v=' + window.app_version,
                controller: 'View_Tables'
            })

            .state('DBMS_Java_Class', {
                url: '/codemage/DBMS_Java_Class',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/DBMS_Java_Class.html?v=' + window.app_version,
                controller: 'DBMS_Java_Class'
            })

            .state('Export_Sql', {
                url: '/codemage/Export_Sql',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Export_Sql.html?v=' + window.app_version,
                controller: 'Export_Sql'
            })

            .state('Query_Data', {
                url: '/codemage/Query_Data',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/codemage/Query_Data.html?v=' + window.app_version,
                controller: 'Query_Data'
            })


            .state('attendance', {
                url: '/smile_class/attendance',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/attendance.html?v=' + window.app_version,
                controller: 'attendance'
            })

            .state('fees', {
                url: '/smile_class/fees',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/fees.html?v=' + window.app_version,
                controller: 'fees'
            })

            .state('manual_attendance', {
                url: '/smile_class/manual_attendance',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/manual_attendance.html?v=' + window.app_version,
                controller: 'manual_attendance'
            })

            .state('register_student', {
                url: '/smile_class/register_student',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/register_student.html?v=' + window.app_version,
                controller: 'register_student'
            })


            .state('update_student', {
                url: '/smile_class/update_student',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/update_student.html?v=' + window.app_version,
                controller: 'update_student'
            })
            .state('delete_student', {
                url: '/smile_class/delete_student',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/delete_student.html?v=' + window.app_version,
                controller: 'delete_student'
            })

            .state('view_student', {
                url: '/smile_class/view_student',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/view_student.html?v=' + window.app_version,
                controller: 'view_student'
            })

            .state('view_all_students', {
                url: '/smile_class/view_all_students',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/view_all_students.html?v=' + window.app_version,
                controller: 'view_all_students'
            })


            .state('student_assign_to_class', {
                url: '/smile_class/student_assign_to_class',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/student_assign_to_class.html?v=' + window.app_version,
                controller: 'student_assign_to_class'
            })
            .state('student_assign_to_class_admin', {
                url: '/smile_class/student_assign_to_class_admin',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/student_assign_to_class_admin.html?v=' + window.app_version,
                controller: 'student_assign_to_class_admin'
            })
            .state('student_remove_from_class', {
                url: '/smile_class/student_remove_from_class',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/student_remove_from_class.html?v=' + window.app_version,
                controller: 'student_remove_from_class'
            })
            .state('student_reassign_to_class', {
                url: '/smile_class/student_reassign_to_class',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/student_reassign_to_class.html?v=' + window.app_version,
                controller: 'student_reassign_to_class'
            })
            .state('view_students_in_class', {
                url: '/smile_class/view_students_in_class',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/view_students_in_class.html?v=' + window.app_version,
                controller: 'view_students_in_class'
            })
            .state('update_student_fees', {
                url: '/smile_class/update_student_fees',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/update_student_fees.html?v=' + window.app_version,
                controller: 'update_student_fees'
            })
            .state('view_students_attendance_on_date', {
                url: '/smile_class/view_students_attendance_on_date',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/view_students_attendance_on_date.html?v=' + window.app_version,
                controller: 'view_students_attendance_on_date'
            })
            .state('search_not_paid_students', {
                url: '/smile_class/search_not_paid_students',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/search_not_paid_students.html?v=' + window.app_version,
                controller: 'search_not_paid_students'
            })
            .state('view_free_card_students', {
                url: '/smile_class/view_free_card_students',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/view_free_card_students.html?v=' + window.app_version,
                controller: 'view_free_card_students'
            })
            .state('view_half_paid_students', {
                url: '/smile_class/view_half_paid_students',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/view_half_paid_students.html?v=' + window.app_version,
                controller: 'view_half_paid_students'
            })
            .state('view_full_card_students', {
                url: '/smile_class/view_full_card_students',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/view_full_card_students.html?v=' + window.app_version,
                controller: 'view_full_card_students'
            })
            .state('update_student_need_to_pay_fees', {
                url: '/smile_class/update_student_need_to_pay_fees',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/student_management/update_student_need_to_pay_fees.html?v=' + window.app_version,
                controller: 'update_student_need_to_pay_fees'
            })

            .state('register_class_type', {
                url: '/smile_class/register_class_type',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/register_class_type.html?v=' + window.app_version,
                controller: 'register_class_type'
            })
            .state('update_class_type', {
                url: '/smile_class/update_class_type',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/update_class_type.html?v=' + window.app_version,
                controller: 'update_class_type'
            })

            .state('delete_class_type', {
                url: '/smile_class/delete_class_type',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/delete_class_type.html?v=' + window.app_version,
                controller: 'delete_class_type'
            })

            .state('view_class_type', {
                url: '/smile_class/view_class_type',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/view_class_type.html?v=' + window.app_version,
                controller: 'view_class_type'
            })

            .state('register_subject', {
                url: '/smile_class/register_subject',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/register_subject.html?v=' + window.app_version,
                controller: 'register_subject'
            })
            .state('update_subject', {
                url: '/smile_class/update_subject',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/update_subject.html?v=' + window.app_version,
                controller: 'update_subject'
            })
            .state('delete_subject', {
                url: '/smile_class/delete_subject',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/delete_subject.html?v=' + window.app_version,
                controller: 'delete_subject'
            })

            .state('view_subject', {
                url: '/smile_class/view_subject',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/view_subject.html?v=' + window.app_version,
                controller: 'view_subject'
            })

            .state('register_class', {
                url: '/smile_class/register_class',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/register_class.html?v=' + window.app_version,
                controller: 'register_class'
            })

            .state('update_class', {
                url: '/smile_class/update_class',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/update_class.html?v=' + window.app_version,
                controller: 'update_class'
            })

            .state('delete_class', {
                url: '/smile_class/delete_class',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/delete_class.html?v=' + window.app_version,
                controller: 'delete_class'
            })

            .state('view_class', {
                url: '/smile_class/view_class',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/class_management/view_class.html?v=' + window.app_version,
                controller: 'view_class'
            })

            .state('register_teacher', {
                url: '/smile_class/register_teacher',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/teacher_management/register_teacher.html?v=' + window.app_version,
                controller: 'register_teacher'
            })

            .state('update_teacher', {
                url: '/smile_class/update_teacher',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/teacher_management/update_teacher.html?v=' + window.app_version,
                controller: 'update_teacher'
            })

            .state('delete_teacher', {
                url: '/smile_class/delete_teacher',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/teacher_management/delete_teacher.html?v=' + window.app_version,
                controller: 'delete_teacher'
            })
            .state('view_all_teacher', {
                url: '/smile_class/view_all_teacher',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/teacher_management/view_all_teacher.html?v=' + window.app_version,
                controller: 'view_all_teacher'
            })

            .state('view_teacher', {
                url: '/smile_class/view_teacher',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/teacher_management/view_teacher.html?v=' + window.app_version,
                controller: 'view_teacher'
            })


            .state('register_user', {
                url: '/smile_class/register_user',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/user_management/register_user.html?v=' + window.app_version,
                controller: 'register_user'
            })

            .state('update_user', {
                url: '/smile_class/update_user',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/user_management/update_user.html?v=' + window.app_version,
                controller: 'update_user'
            })

            .state('delete_user', {
                url: '/smile_class/delete_user',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/user_management/delete_user.html?v=' + window.app_version,
                controller: 'delete_user'
            })

            .state('view_user', {
                url: '/smile_class/view_user',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/user_management/view_user.html?v=' + window.app_version,
                controller: 'view_user'
            })

            .state('unblock_user', {
                url: '/smile_class/unblock_user',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/user_management/unblock_user.html?v=' + window.app_version,
                controller: 'unblock_user'
            })










            .state('TrainingCtrl', {
                url: '/smps/TrainingCtrl',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smps/TrainingCtrl.html?v=' + window.app_version,
                controller: 'TrainingCtrl'
            }).state('viewTrainingData', {
                url: '/smps/viewTrainingData',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smps/viewTrainingData.html?v=' + window.app_version,
                controller: 'viewTrainingData'
            }).state('viewTrainingResult', {
                url: '/smps/viewTrainingResult',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smps/viewTrainingResult.html?v=' + window.app_version,
                controller: 'viewTrainingResult'
            }).state('TestController', {
                url: '/smps/TestController',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smps/TestController.html?v=' + window.app_version,
                controller: 'TestController'
            }).state('getPrediction', {
                url: '/smps/getPrediction',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smps/getPrediction.html?v=' + window.app_version,
                controller: 'getPrediction'
            })









































            .state('teachers_payment', {
                url: '/smile_class/teachers_payment',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/transaction_management/teachers_payment.html?v=' + window.app_version,
                controller: 'teachers_payment'
            })
            .state('print_pay_sheets', {
                url: '/smile_class/print_pay_sheets',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/transaction_management/print_pay_sheets.html?v=' + window.app_version,
                controller: 'print_pay_sheets'
            })
            .state('view_student_aries', {
                url: '/smile_class/view_student_aries',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/transaction_management/view_student_aries.html?v=' + window.app_version,
                controller: 'view_student_aries'
            })

            .state('daily_report', {
                url: '/smile_class/daily_report',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/transaction_management/daily_report.html?v=' + window.app_version,
                controller: 'daily_report'
            })

            .state('periodic_report', {
                url: '/smile_class/periodic_report',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/transaction_management/periodic_report.html?v=' + window.app_version,
                controller: 'periodic_report'
            })

            .state('other_income', {
                url: '/smile_class/other_income',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/transaction_management/other_income.html?v=' + window.app_version,
                controller: 'other_income'
            })

            .state('other_payment', {
                url: '/smile_class/other_payment',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/transaction_management/other_payment.html?v=' + window.app_version,
                controller: 'other_payment'
            })

            .state('view_accounts', {
                url: '/smile_class/view_accounts',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/transaction_management/view_accounts.html?v=' + window.app_version,
                controller: 'view_accounts'
            })

            .state('prediction_report', {
                url: '/smile_class/prediction_report',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/transaction_management/prediction_report.html?v=' + window.app_version,
                controller: 'prediction_report'
            })

            .state('fees_circle_update', {
                url: '/smile_class/fees_circle_update',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/bulk_data_change/fees_circle_update.html?v=' + window.app_version,
                controller: 'fees_circle_update'
            })
            .state('all_student_fees_change', {
                url: '/smile_class/all_student_fees_change',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/bulk_data_change/all_student_fees_change.html?v=' + window.app_version,
                controller: 'all_student_fees_change'
            })
            .state('anual_grade_and_class_change', {
                url: '/smile_class/anual_grade_and_class_change',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/smile_class/bulk_data_change/anual_grade_and_class_change.html?v=' + window.app_version,
                controller: 'anual_grade_and_class_change'
            })


            .state('c3chart', {
                url: '/charts/c3chart',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/charts/c3chart.html?v=' + window.app_version,
            })
            .state('chartjs', {
                url: '/charts/chartjs',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/charts/chartjs.html?v=' + window.app_version,
                controller: 'ChartCtrl'
            });


    })
    .run(function () {

        var switchValue = JSON.parse(localStorage.getItem("switched"));

        if (switchValue)
            $('body').addClass('box-section');

    });