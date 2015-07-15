(function ($) {
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            return fToBind.apply(this instanceof fNOP && oThis
                   ? this
                   : oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }

  contact_search =
  {
      search: function(params) {
              //do the query
              var nameTerm = "q=" + params.initial + "%20" + params.lastname;
              var mediumTerm = "medium=" + params.medium;
              var exactTerm = "match=" + params.match;

              var query = nameTerm + "&" + mediumTerm + "&" + exactTerm;
              var url = this.url + query;

              $.ajax({
                  url: url,
                  type: 'get',
                  dataType: 'json',
                  success: this.displayResults.bind(this),

                  failure: function(response) {
                      console.error("Failed to retrieve contact results");
                  }
              });
      },
      create_form : function (params) {
          this.el = params.el;
          this.prefill = params.prefill;
          this.url = params.url? params.url : '//api.m.ox.ac.uk/contact/search?';
          this.pageSize = params.pageSize ? params.pageSize : 10;

          var $form_container = $("<div class='contactsearch'></div>");
          $form_container.append('<h2>Contact search</h2>');
          var $form = $("<form id='contact_form' method='get'></form>");
          var $name_details_container = $("<div class='form-item name-details'></div>");

          var $lastname_container = $("<div class='lastname-container'></div>");
          $lastname_container.append($("<label for='lastname' class='required'>Surname</label>"));
          $lastname_container.append($("<input class='full' type='text' name='lastname' id='lastname' placeholder='E.g. Smith' value=''>"));

          var $initial_container = $("<div class='initial-container'></div>");
          $initial_container.append($("<label for'initial' class='optional'>Initial</label>"));
          $initial_container.append($("<input class='full' type='text' name='initial' id='initial' placeholder='E.g. J' value=''>"));

          $name_details_container.append($lastname_container).append($initial_container);

          var $search_specifics = $("<div class='form-item search-specifics'></div>");
          var $exact1_radio = $("<label for='exact1' class='radio'>Exact</label>");
          $exact1_radio.prepend($("<input type='radio' name='exact' class='radio' value='true' id='exact1' checked='checked'>"));

          var $exact2_radio = $("<label for='exact2' class='radio_second'>Approximate</label>");
          $exact2_radio.prepend($("<input type='radio' name='exact' class='radio' value='false' id='exact2'>"));
          $search_specifics.append($exact1_radio).append($exact2_radio);

          var $submit_buttons = $("<div class='form-item'></div>");
          var $emailButton = $("<input type='submit' name='find_email' alt='Find email address' value='Email'>");
          $emailButton.data('medium', 'email');
          var $phoneButton = $("<input type='submit' name='find_phone' alt='Find telephone nubmers' value='Phone'>");
          $phoneButton.data('medium', 'phone');
          $submit_buttons.append($emailButton).append($phoneButton);

          //container for results
          var $results = $("<div class='contact-results'></div>");

          var $emergency = $('<div class="emergency-nums"></div>');
          var $emergency_link = $('<a href="//www.admin.ox.ac.uk/ouss/contactus/" name="emergency_numbers" title="Emergency numbers" id="emergency_numbers">');
          $emergency_link.append($('<span class="exclamation"></span>Emergency numbers</a>'));
          $emergency.append($emergency_link);

          $form.append($name_details_container).append($search_specifics).append($submit_buttons);
          $form_container.append($form);

          this.el.append($form_container);
          this.el.append($results);
          this.el.append($emergency);

          this.bind_events();

          if(params.prefill) {
              //fill in the form
              if(params.prefill.initial) {
                  $('input#initial', this.el).val(params.prefill.initial);
              } else { params.prefill.initial = ""; }
              if(params.prefill.lastname) {
                  $('input#lastname', this.el).val(params.prefill.lastname);
              } else { params.prefill.lastname = ""; }
              if(params.prefill.match) {
                  if(params.prefill.match == 'approximate') {
                      $('input#exact2').attr('checked', 'checked');
                  }
              } else { params.prefill.exact = true; }
              //default to email
              if(!params.prefill.medium) { params.prefill.medium = 'email' }
              this.search(params.prefill);
          }

          if(params.autofocus) {
              $('input#lastname').focus();
          }
      },
      bind_events : function () {
          //record which button was clicked on submit button click
          $( 'input[type=submit]' , $('#contact_form')).click( function() {
              //Add a data attribute to the form based on the clicked button
              var medium = $(this).val();
              $(this).parents('form').data('medium', $(this).data('medium'));
          });

          //form submit
          $('#contact_form').submit(function(ev) {
             ev.preventDefault();
              //extract values from the form to build our query
              var lastname = $('input#lastname', $(ev.target)).val();
              var initial = $('input#initial', $(ev.target)).val();
              var match = $('input#exact1').is(':checked') ? 'exact' : 'approximate';
              var medium = $(ev.target).data('medium');
              var params = { lastname: lastname, initial: initial, match: match, medium: medium };
              this.search(params);

          }.bind(this));
      },
      displayResults : function(response) {
          this.persons = response.persons;
          //create results div if it doesn't already exist
          var $results = $('.contact-results', this.el);
          $results.empty();
          var $resultsHeader = $("<div class='results-header'></div>");
          $results.append($resultsHeader);
          $resultsHeader.append($("<h2>Results</h2>"));
          var entriesNoun = response.persons.length ==1 ? ' entry' : ' entries'
          $resultsHeader.append($("Found " + response.persons.length + entriesNoun + ""));
          var $list = $("<ul class='contact-results-list'></ul>");
          $results.append($list);

          //populate table
          for(var i=0; i<response.persons.length; i++) {

              var person = response.persons[i];
              var $entry = $("<li id='person_" + (i+1) + "' class='person_entry'></li>");

              $list.append($entry);
              //name
              var $name = $("<div id='name-" + (i+1) + "' class='person_name'></div>");
              $name.append($("<h3>" + person.name + "<h3>"));
              $entry.append($name);

              //container for unit and email, to keep those together on RHS
              var $person_details = $("<div class=details></div>");
              $entry.append($person_details);
              //unit
              var unitText = person.unit ? person.unit : "    ";
              var $unit = $("<div id='unit-" + (i+1) + "' class='person_unit'></div>");
              $unit.text(unitText);
              $person_details.append($unit);
              //email
              if(person.email) {
                  var $email = $("<div id='email-" + (i+1) + "' class='person_email'></div>");
                  $email.append($("<a href='mailto:" + person.email + "'>" + person.email + "</a>"));
                  $person_details.append($email);
              }
              //phone
              if(person.external_tel || person.internal_tel) {
                  var $phone = $("<div id='phone-" + (i+1) + "' class='person_phone'></div>");
                  var $phone_list = $("<dl></dl>");
                  $phone.append($phone_list);
                  if(person.internal_tel) {
                      $phone_list.append($("<dt>Internal</dt><dd>" + person.internal_tel + "</dd>"));
                  }
                  if(person.external_tel) {
                      $phone_list.append($("<dt>External</dt><dd>" + person.external_tel + "</dd>"));
                  }
                  $entry.append($phone);
              }
          }

          this.numPages = Math.ceil(this.persons.length / this.pageSize);

          if(this.numPages >1) {
              //create page browsing links
              var $pageLinks = $("<div class='page-links'></div>");
              $results.append($pageLinks);
              var $prevPage = $("<a class='prev-page-link' id='prev-page' href='#'>Prev</a>");
              $prevPage.click(this.prevPage.bind(this));
              var $nextPage = $("<a class='next-page-link' id='next-page' href='#'>Next</a>");
              $nextPage.click(this.nextPage.bind(this));
              $pageLinks.append($prevPage);
              for (var i = 0; i < this.numPages; i++) {
                  var $link = $("<a class='page-link' id='page_" + i + "' href='#'>" + (i + 1) + "</a>");
                  $link.click(this.onClickPageLink.bind(this));
                  $link.data('page', i);
                  $pageLinks.append($link);
              }
              $pageLinks.append($nextPage);
              var $pageCounter = ($("<div class='results-pages'> Page <span class='currentPage'>0</span> of " + this.numPages + "</div>"));
              $results.append($pageCounter.clone());
              $resultsHeader.append($pageCounter);
          }
          $results.append($("<div class='details-incorrect'><a href='//www.ox.ac.uk/staff/working_at_oxford/how_do_I/update_my_details'>Contact details incorrect?</a></div>"));

          this.currentPage = 0;

          //show the first page of results
          this.displayResultsPage(0);
      },
      prevPage : function(ev) {
          ev.preventDefault();
          this.currentPage--;
          this.displayResultsPage(this.currentPage);
      },
      nextPage : function(ev) {
          ev.preventDefault();
          this.currentPage++;
          this.displayResultsPage(this.currentPage);
      },
      onClickPageLink : function(ev) {
          ev.preventDefault();
          var page = $(ev.target).data('page');
          this.displayResultsPage(page);
      },
      // Display the given page of results. count=results per page, start=0-index page number
      displayResultsPage : function(startPage) {
          this.currentPage = startPage;

          var first_shown_result = this.pageSize * startPage;

          //hide all but the relevant results
          $('.person_entry').hide();
          //unhide the relevant ones
          for(var i=this.pageSize*startPage; i<this.pageSize*(startPage+1); i++) {
              if (i<this.persons.length) {
                  var id = '#person_' + (i + 1);
                  $(id).show();
              }
          }

          //show current page on pagination links
          $('a.page-link').removeClass('isCurrent');
          var $currentPageLink = $('#page_' + startPage);
          $currentPageLink.addClass('isCurrent');
          $('.currentPage').text(startPage+1);

          //disable prev/next links as appropriate
          var $prev = $('a.prev-page-link');
          if(this.currentPage == 0) {
              //$prev.removeAttr('href');
              $prev.hide();
          } else {
              //$prev.attr('href', '#');
              $prev.show();
          }

          var $next = $('a.next-page-link');
          if(this.currentPage >= this.numPages-1) {
              //$next.removeAttr('href');
              $next.hide();
          } else {
              //$next.attr('href', '#');
              $next.show();
          }
      }
  }
}(jQuery));

