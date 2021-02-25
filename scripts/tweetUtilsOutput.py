with open('urlutilities.txt', 'r') as ln:
    with open('utilitiesname.txt', 'r') as nm:
        for (a, b) in zip(ln, nm):
            li = '<li><a href="{}" target="_blank">{}</a></li>'.format(
                a.strip(), b.strip())
            print(li)