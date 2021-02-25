with open('urlutilities.txt', 'r') as ln:
    with open('utilitiesname.txt', 'r') as nm:
            for (a, b) in (ln, nm):
                li = '<li><a href="{}" target="_blank">{}</a></li>'.format(
                    a, b)
                print(li)